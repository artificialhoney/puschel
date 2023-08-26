import {
  AiSatisfier,
  easings,
  PeakSatisfier,
  RandomSatisfier,
  ReplaySatisfier,
  Ride as RideModel,
  Satisfier as SatisfierModel,
  SatisfierType,
  SmartWatchSatisfier,
  ToyCapabilities,
} from '@puschel/models';
import { validate } from 'class-validator';
import { useEffect } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

import InputField from '../../../../components/fields/InputField';
import SelectField from '../../../../components/fields/SelectField';
import SliderField from '../../../../components/fields/SliderField';
import SwitchField from '../../../../components/fields/SwitchField';
import {
  RideDto,
  Toy,
  useFindPlaysQuery,
  useFindSmartWatchesQuery,
} from '../../../../gql';
import {
  dataSource,
  formatDateTime,
  transformValidationErrors,
} from '../../../../static';

Modal.setAppElement('#root');

const RideForm = (props: {
  id: string;
  ride: RideDto;
  toy: Toy;
  onSave: (ride: RideDto) => void;
}) => {
  const { t, i18n } = useTranslation();

  const resolver: Resolver<RideDto> = async (r) => {
    const model = Object.assign(new RideModel(), r);
    model.satisfier = Object.assign(new SatisfierModel(), r.satisfier);
    switch (model.satisfier.type) {
      case SatisfierType.REPLAY:
        model.satisfier.settings = Object.assign(
          new ReplaySatisfier(),
          r.satisfier.settings
        );
        break;
      case SatisfierType.RANDOM:
        model.satisfier.settings = Object.assign(
          new RandomSatisfier(),
          r.satisfier.settings
        );
        break;
      case SatisfierType.PEAK:
        model.satisfier.settings = Object.assign(
          new PeakSatisfier(),
          r.satisfier.settings
        );
        break;
      case SatisfierType.SMART_WATCH:
        model.satisfier.settings = Object.assign(
          new SmartWatchSatisfier(),
          r.satisfier.settings
        );
        break;
      case SatisfierType.AI:
        model.satisfier.settings = Object.assign(
          new AiSatisfier(),
          r.satisfier.settings
        );
        break;
    }
    const validation = await validate(model);
    console.log(validation, model);
    return {
      values: r,
      errors: transformValidationErrors(validation),
    };
  };

  const {
    watch,
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RideDto>({ resolver });

  const onSubmit = handleSubmit((ride) => onSave(ride));

  useEffect(() => {
    reset(props.ride);
  }, [props.ride]);

  const satisfierType = watch('satisfier.type');
  const playId = watch('satisfier.settings.playId');

  const typeOptions = Object.values(SatisfierType).map((value) => {
    return {
      value,
      label: t(`components.rideForm.satisfier.types.${value}.title`),
    };
  });

  const playsQuery = useFindPlaysQuery(dataSource());

  const smartWatchQuery = useFindSmartWatchesQuery(dataSource());

  const { onSave, id } = props;

  const renderSatisfierForm = (type) => {
    switch (type) {
      case SatisfierType.AI:
        return (
          <Controller
            name={`satisfier.settings.playIds`}
            control={control}
            render={({ field }) => (
              <SelectField
                id={`satisfier.settings.playIds`}
                label={t('components.rideForm.satisfier.types.ai.playIds')}
                multi
                placeholder={
                  t(
                    'components.rideForm.satisfier.types.ai.playIdsPlaceholder'
                  )!
                }
                options={playsQuery?.data?.findPlays.map((t) => {
                  return {
                    value: t.id,
                    label: `${t.name}`,
                  };
                })}
                error={errors[`satisfier.settings.playIds`]}
                value={playsQuery?.data?.findPlays
                  .map((t) => {
                    return {
                      value: t.id,
                      label: `${t.name}`,
                    };
                  })
                  .filter((t) => field.value.includes(t.value))}
                onChange={(val) => {
                  field.onChange(val.map((v) => v.value));
                }}
              />
            )}
          />
        );
      case SatisfierType.SMART_WATCH:
        return (
          <Controller
            name={`satisfier.settings.uuid`}
            control={control}
            render={({ field }) => (
              <SelectField
                id={`satisfier.settings.uuid`}
                label={t('components.rideForm.satisfier.types.smartWatch.uuid')}
                placeholder={
                  t(
                    'components.rideForm.satisfier.types.smartWatch.uuidPlaceholder'
                  )!
                }
                options={smartWatchQuery?.data?.findSmartWatches.map((t) => {
                  return {
                    value: t.uuid,
                    label: t.name,
                  };
                })}
                error={errors[`satisfier.settings.uuid`]}
                value={smartWatchQuery?.data?.findSmartWatches
                  .map((t) => {
                    return {
                      value: t.uuid,
                      label: t.name,
                    };
                  })
                  .find((t) => t.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
              />
            )}
          />
        );
      case SatisfierType.REPLAY:
        return (
          <>
            <Controller
              name={`satisfier.settings.playIds`}
              control={control}
              render={({ field }) => (
                <SelectField
                  id={`satisfier.settings.playIds`}
                  label={t(
                    'components.rideForm.satisfier.types.replay.playIds'
                  )}
                  placeholder={
                    t(
                      'components.rideForm.satisfier.types.replay.playIdsPlaceholder'
                    )!
                  }
                  options={playsQuery?.data?.findPlays.map((t) => {
                    return {
                      value: t.id,
                      label: t.name,
                    };
                  })}
                  error={errors[`satisfier.settings.playId`]}
                  value={[
                    playsQuery?.data?.findPlays
                      .map((t) => {
                        return {
                          value: t.id,
                          label: t.name,
                        };
                      })
                      .filter((t) => field.value.includes(t.value)),
                  ]}
                  onChange={(val) => {
                    console.log(field.value);
                    field.onChange(val.value);
                  }}
                />
              )}
            />
            <Controller
              name={`satisfier.settings.runId`}
              control={control}
              render={({ field }) => (
                <SelectField
                  id={`satisfier.settings.runId`}
                  label={t('components.rideForm.satisfier.types.replay.runId')}
                  placeholder={
                    t(
                      'components.rideForm.satisfier.types.replay.runIdPlaceholder'
                    )!
                  }
                  options={playsQuery?.data?.findPlays
                    .find((p) => p.id === playId)
                    ?.runs?.map((t) => {
                      return {
                        value: t.id,
                        label: formatDateTime(t.startDate, i18n.language),
                      };
                    })}
                  error={errors[`satisfier.settings.runId`]}
                  value={playsQuery?.data?.findPlays
                    .find((p) => p.id === playId)
                    ?.runs?.map((t) => {
                      return {
                        value: t.id,
                        label: formatDateTime(t.startDate, i18n.language),
                      };
                    })
                    .find((t) => t.value === field.value)}
                  onChange={(val) => field.onChange(val.value)}
                />
              )}
            />
            <Controller
              name={`satisfier.settings.timelineId`}
              control={control}
              render={({ field }) => (
                <SelectField
                  id={`satisfier.settings.timelineId`}
                  label={t(
                    'components.rideForm.satisfier.types.replay.timelineId'
                  )}
                  placeholder={
                    t(
                      'components.rideForm.satisfier.types.replay.timelineIdPlaceholder'
                    )!
                  }
                  options={playsQuery?.data?.findPlays
                    ?.find((p) => p.id === playId)
                    ?.timelines?.map((t, i) => {
                      return {
                        value: t.id,
                        label: i + 1,
                      };
                    })}
                  error={errors[`satisfier.settings.timelineId`]}
                  value={playsQuery?.data?.findPlays
                    ?.find((p) => p.id === playId)
                    ?.timelines?.map((t, i) => {
                      return {
                        value: t.id,
                        label: i + 1,
                      };
                    })
                    .find((t) => t.value === field.value)}
                  onChange={(val) => field.onChange(val.value)}
                />
              )}
            />
          </>
        );
      case SatisfierType.RANDOM:
        return (
          <InputField
            {...register(`satisfier.settings.interval`, {
              valueAsNumber: true,
            })}
            label={t('components.rideForm.satisfier.types.random.interval')}
            type="number"
            error={errors[`satisfier.settings.interval`]}
          />
        );
      case SatisfierType.PEAK:
        return (
          <>
            <input
              type="hidden"
              {...register(`satisfier.settings.interval`, {
                valueAsNumber: true,
                value: 5,
              })}
            />
            <Controller
              name={`satisfier.settings.easing`}
              control={control}
              render={({ field }) => (
                <SelectField
                  id="components.rideForm.satisfier.types.peak.easing"
                  label={t('components.rideForm.satisfier.types.peak.easing')}
                  placeholder={
                    t(
                      'components.rideForm.satisfier.types.peak.easingPlaceholder'
                    )!
                  }
                  options={Object.keys(easings).map((e) => {
                    return {
                      value: e,
                      label: e.replace('ease', ''),
                    };
                  })}
                  value={Object.keys(easings)
                    .map((e) => {
                      return {
                        value: e,
                        label: e.replace('ease', ''),
                      };
                    })
                    .find((v) => field.value === v.value)}
                  onChange={(val) => field.onChange(val.value)}
                  error={errors[`satisfier.settings.easing`]}
                />
              )}
            />
            <Controller
              name={`satisfier.settings.start`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <SliderField
                  id="components.rideForm.satisfier.s.peak.start"
                  label={t('components.rideForm.satisfier.types.peak.start')}
                  onChange={field.onChange}
                  value={field.value}
                  error={errors[`satisfier.settings.start`]}
                />
              )}
            />
            <Controller
              name={`satisfier.settings.end`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <SliderField
                  id="components.rideForm.satisfier.types.peak.end"
                  label={t('components.rideForm.satisfier.types.peak.end')}
                  onChange={field.onChange}
                  value={field.value}
                  error={errors[`satisfier.settings.end`]}
                />
              )}
            />
          </>
        );
    }
  };

  return (
    <form onSubmit={onSubmit} id={id}>
      <input
        type="hidden"
        {...register(`id`, {
          valueAsNumber: true,
        })}
      />
      <input
        type="hidden"
        {...register(`index`, {
          valueAsNumber: true,
        })}
      />
      <input
        type="hidden"
        {...register(`length`, {
          valueAsNumber: true,
        })}
      />
      <input
        type="hidden"
        {...register(`timelineId`, {
          valueAsNumber: true,
        })}
      />
      <Controller
        name={`toyAssignment`}
        control={control}
        render={({ field }) => (
          <SelectField
            id={`toyAssignment`}
            label={t('components.rideForm.toyAssignment')}
            placeholder={t('components.rideForm.toyAssignmentPlaceholder')!}
            options={ToyCapabilities[props.toy.type!].map((c) => {
              return {
                value: c,
                label: t(`components.rideForm.toyAssignments.${c}.title`),
              };
            })}
            error={errors[`toyAssignment`]}
            value={ToyCapabilities[props.toy.type!]
              .map((c) => {
                return {
                  value: c,
                  label: t(`components.rideForm.toyAssignments.${c}.title`),
                };
              })
              .find((t) => t.value === field.value)}
            onChange={(val) => field.onChange(val.value)}
          />
        )}
      />
      <SwitchField
        {...register(`enabled`, {})}
        label={t('components.rideForm.enabled')}
      />
      <Controller
        name={`satisfier.type`}
        control={control}
        render={({ field }) => {
          return (
            <SelectField
              label={t('components.rideForm.satisfier.type')}
              placeholder={t('components.rideForm.satisfier.typePlaceholder')!}
              options={typeOptions}
              error={errors[`satisfier.type`]}
              id={`satisfier.type`}
              value={typeOptions.find((t) => t.value === field.value)}
              onChange={(val) => field.onChange(val.value)}
            />
          );
        }}
      />
      {renderSatisfierForm(satisfierType)}
    </form>
  );
};

export default RideForm;
