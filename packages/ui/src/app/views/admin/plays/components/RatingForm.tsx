import { Rating as RatingModel } from '@puschel/models';
import { validate } from 'class-validator';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Field from '../../../../components/fields/Field';
import SliderField from '../../../../components/fields/SliderField';
import TextField from '../../../../components/fields/TextField';
import StarRating from '../../../../components/rating/StarRating';
import { RatingDto, Run, useCreateRatingMutation } from '../../../../gql';
import { dataSource, transformValidationErrors } from '../../../../static';

const RatingForm = (props: {
  id: string;
  run: Run;
  onSaveSuccess: () => void;
}) => {
  const mutation = useCreateRatingMutation(dataSource());
  const { t } = useTranslation();

  const onSave = (rating) => {
    mutation.mutate(
      {
        rating: {
          ...rating,
          runId: props.run.id!,
        },
      },
      {
        onSuccess: () => {
          props.onSaveSuccess();
        },
      }
    );
  };

  const resolver: Resolver<RatingDto> = async (r) => {
    const model = Object.assign(new RatingModel(), r);
    const validation = await validate(model);
    return {
      values: r,
      errors: transformValidationErrors(validation),
    };
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RatingDto>({ resolver });

  const onSubmit = handleSubmit((rating, data) => onSave(rating));

  return (
    <form onSubmit={onSubmit} id={props.id}>
      <Controller
        name="score"
        defaultValue={0}
        control={control}
        render={({ field }) => (
          <Field
            id="score"
            label={t('components.ratingForm.score')}
            element={
              <div className="text-3xl">
                <StarRating onChange={field.onChange} value={field.value} />
              </div>
            }
            error={errors?.score}
          />
        )}
      />
      <Controller
        name="orgasms"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <SliderField
            id="orgasms"
            label={t('components.ratingForm.orgasms')}
            onChange={field.onChange}
            value={field.value}
            error={errors?.orgasms}
          />
        )}
      />
      <TextField
        {...register('message', { value: '' })}
        label={t('components.ratingForm.message')}
        error={errors?.message}
      />
    </form>
  );
};

export default RatingForm;
