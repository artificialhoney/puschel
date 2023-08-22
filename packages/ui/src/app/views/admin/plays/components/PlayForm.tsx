import {
  Play as PlayModel,
  SatisfierType,
  Timeline as TimelineModel,
  ToyAssignment,
} from '@xx/models';
import { validate } from 'class-validator';
import { createRef, useEffect, useState } from 'react';
import { Controller, Resolver, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Card from '../../../../components/card';
import Field from '../../../../components/fields/Field';
import InputField from '../../../../components/fields/InputField';
import SelectField from '../../../../components/fields/SelectField';
import TextField from '../../../../components/fields/TextField';
import StandardGrid from '../../../../components/grid/StandardGrid';
import Modal from '../../../../components/modal';
import Timeline from '../../../../components/timeline';
import {
  Play,
  PlayDto,
  RideDto,
  useCreatePlayMutation,
  useFindToysQuery,
  useUpdatePlayMutation,
} from '../../../../gql';
import {
  dataSource,
  formatTimelineTick,
  intervalsToRides,
  ridesOverallLength,
  ridesToIntervals,
  transformValidationErrors,
} from '../../../../static';
import RideForm from './RideForm';

const PlayForm = (props: { play?: Play }) => {
  const { t } = useTranslation();
  const n = useNavigate();

  const query = useFindToysQuery(dataSource());

  const [ride, setRide] = useState<{ index: number; timelineIndex: number }>();

  const resolver: Resolver<PlayDto> = async (p) => {
    const model = Object.assign(new PlayModel(), {
      name: p.name,
      description: p.description,
    });
    model.timelines = p.timelines.map((t) => {
      return Object.assign(new TimelineModel(), t);
    });
    const validation = await validate(model);
    return {
      values: model,
      errors: transformValidationErrors(validation),
    };
  };

  const createMutation = useCreatePlayMutation(dataSource());
  const updateMutation = useUpdatePlayMutation(dataSource());

  const onSave = (play) => {
    if (props.play) {
      updateMutation.mutate(
        { play: { ...play, id: props.play.id } },
        {
          onSuccess: async () => {
            n('/plays');
          },
        }
      );
    } else {
      createMutation.mutate({ play }, { onSuccess: () => n('/plays') });
    }
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PlayDto>({ resolver });

  useEffect(() => {
    reset(props.play as PlayDto);
  }, [props.play]);

  const { remove, append, update } = useFieldArray({
    control,
    name: 'timelines',
  });

  const onSubmit = handleSubmit((play) => onSave(play));

  const addTimeline = (event) => {
    event.preventDefault();
    append({
      toyId: 0,
      rides: [
        {
          index: 0,
          length: 60 * 60 * 1000,
          toyAssignment: ToyAssignment.VIBRATE,
          enabled: true,
          satisfier: {
            type: SatisfierType.MANUAL,
          },
        },
      ],
    });
  };

  const deleteTimeline = (event, timelineIndex) => {
    event.preventDefault();
    remove(timelineIndex);
  };

  const addRide = (event, timelineIndex) => {
    event.preventDefault();
    const timeline = timelines[timelineIndex];
    const length = ridesOverallLength(timeline.rides);
    const newRides = [
      ...timeline.rides,
      {
        index: timeline.rides.length,
        toyAssignment: ToyAssignment.VIBRATE,
        length: length / timeline.rides.length,
        enabled: true,
        satisfier: {
          type: SatisfierType.MANUAL,
        },
      },
    ];
    update(timelineIndex, { ...timeline, rides: newRides });
  };

  const removeRide = (event, timelineIndex, index) => {
    event.preventDefault();
    const timeline = timelines[timelineIndex];
    timeline.rides.splice(index, 1);
    update(timelineIndex, { ...timeline });
  };

  const editRide = (event, timelineIndex, index) => {
    event.preventDefault();
    const ride = timelines[timelineIndex].rides[index];
    ride.timelineId = timelineIndex;
    setRide({ index, timelineIndex });
    modalRef.current!.open();
  };

  const saveRide = (r) => {
    const timeline = timelines[ride!.timelineIndex];
    const newRides = [...timeline.rides];
    newRides[r.index] = r;
    update(ride!.timelineIndex, { ...timeline, rides: newRides });
    modalRef.current!.close();
  };

  const ridesToLabels = (rides: RideDto[]) => {
    return rides.map((r, i) => {
      return t(`components.rideForm.satisfier.types.${r.satisfier.type}.title`);
    });
  };

  const modalRef = createRef<any>();

  const timelines = watch('timelines');

  return (
    <>
      <Modal
        ref={modalRef}
        title={t('components.rideForm.title', {
          index: ride?.index != null ? ride!.index + 1 : '',
        })}
        id="ride"
        element={
          ride && (
            <RideForm
              id="ride"
              onSave={(r) => saveRide(r)}
              ride={timelines[ride!.timelineIndex].rides[ride!.index]}
              toy={
                query!.data!.findToys!.find(
                  (t) => t.id === timelines[ride!.timelineIndex].toyId
                )!
              }
            />
          )
        }
      />
      <Card extra="w-full h-full p-4 col-span-1 md:col-span-2 lg:col-span-3">
        <form onSubmit={onSubmit}>
          <StandardGrid>
            <div className="w-full col-span-1 md:col-span-2 lg:col-span-1">
              <div className="pb-4 w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  {t('components.playForm.title')}
                </h4>
                <p className="mt-2 text-base text-gray-600">
                  {t('components.playForm.hint')}
                </p>
              </div>
              <div>
                <InputField
                  {...register('name', { value: props.play?.name! })}
                  label={t('components.playForm.name')}
                  type="text"
                  error={errors?.name}
                />

                <TextField
                  {...register('description', {
                    value: props.play?.description!,
                  })}
                  label={t('components.playForm.description')}
                  error={errors?.description}
                />
              </div>
            </div>
            <div className="w-full h-full col-span-1 md:col-span-2">
              <div className="w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  {t('components.playForm.timelines.title')}
                  <button
                    type="button"
                    onClick={(e) => addTimeline(e)}
                    className="ml-1 linear self-center inline-block rounded-full bg-brand-500 p-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  >
                    <MdAdd />
                  </button>
                </h4>
                <p className="mt-2 text-base text-gray-600">
                  {t('components.playForm.timelines.hint')}
                </p>
                {timelines?.map((timeline, i) => {
                  const rides = watch(`timelines.${i}.rides`);

                  return (
                    <div
                      key={i}
                      className="flex w-full items-start justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mt-4 flex-col"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-full">
                          <p className="text-base font-medium text-navy-700 dark:text-white">
                            {t('components.playForm.timelines.label', {
                              index: i + 1,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-5">
                        <div className="md:col-span-2">
                          <Controller
                            name={`timelines.${i}.toyId`}
                            control={control}
                            render={({ field }) => (
                              <SelectField
                                id={`timelines.${i}.toyId`}
                                label={t('components.playForm.timelines.toyId')}
                                placeholder={
                                  t(
                                    'components.playForm.timelines.toyIdPlaceholder'
                                  )!
                                }
                                options={query?.data?.findToys.map((t) => {
                                  return {
                                    value: t.id,
                                    label: t.name,
                                  };
                                })}
                                error={errors[`timelines.${i}.toyId`]}
                                disabled={i < 0}
                                value={query?.data?.findToys
                                  .map((t) => {
                                    return {
                                      value: t.id,
                                      label: t.name,
                                    };
                                  })
                                  .find((t) => t.value === field.value)}
                                onChange={(val) => field.onChange(val.value)}
                              />
                            )}
                          />
                        </div>
                        <div className="md:col-span-5">
                          <Controller
                            name={`timelines.${i}.rides`}
                            control={control}
                            render={({ field }) => (
                              <Field
                                error={errors[`timelines.${i}.rides`]}
                                id={`timelines.${i}.rides`}
                                label={t('components.playForm.timelines.rides')}
                                element={
                                  <Timeline
                                    formatTick={formatTimelineTick}
                                    intervals={ridesToIntervals(rides)}
                                    labels={ridesToLabels(rides)}
                                    onDelete={(e) => deleteTimeline(e, i)}
                                    onRemoveTrack={(e, index) =>
                                      removeRide(e, i, index)
                                    }
                                    onEditTrack={(e, index) =>
                                      editRide(e, i, index)
                                    }
                                    onAddTrack={(e) => addRide(e, i)}
                                    onChange={(value) =>
                                      field.onChange(
                                        intervalsToRides(value, rides)
                                      )
                                    }
                                  />
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {errors.timelines && (
                  <div className="text-sm text-red-500 dark:!text-red-400 mt-3">
                    {t(errors.timelines.message!)}
                  </div>
                )}
              </div>
            </div>
          </StandardGrid>
          <StandardGrid>
            <div className="mt-8 mb-4 w-full col-span-1 md:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="linear self-center inline-block rounded-xl bg-brand-500 py-3 w-full text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                {t(`components.playForm.${props.play ? 'save' : 'create'}`)}
              </button>
            </div>
          </StandardGrid>
        </form>
      </Card>
    </>
  );
};
export default PlayForm;
