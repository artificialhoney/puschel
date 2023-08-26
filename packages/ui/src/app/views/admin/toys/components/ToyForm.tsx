import { Toy as ToyModel } from '@puschel/models';
import { useQueryClient } from '@tanstack/react-query';
import { validate } from 'class-validator';
import { Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Card from '../../../../components/card';
import InputField from '../../../../components/fields/InputField';
import { Toy, ToyDto, useUpdateToyMutation } from '../../../../gql';
import { dataSource, transformValidationErrors } from '../../../../static';

const ToyForm = (props: { toy: Toy }) => {
  const { t } = useTranslation();
  const n = useNavigate();
  const queryClient = useQueryClient();

  const resolver: Resolver<ToyDto> = async (u) => {
    const model = Object.assign(new ToyModel(), { name: u.name });
    const validation = await validate(model);
    return {
      values: model,
      errors: transformValidationErrors(validation),
    };
  };

  const mutation = useUpdateToyMutation(dataSource());

  const onSave = (toy) => {
    mutation.mutate(
      { toy: { ...toy, id: props.toy.id } },
      {
        onSuccess: async () => {
          n('/toys');
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToyDto>({ resolver });

  const onSubmit = handleSubmit((data) => onSave(data));

  return (
    <Card extra="w-full h-full p-4 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="pb-4 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {t('components.toyForm.title')}
        </h4>
        <p className="mt-2 text-base text-gray-600">
          {t('components.toyForm.hint')}
        </p>
      </div>
      <form
        className="w-full flex flex-col flex-grow align-center"
        onSubmit={onSubmit}
      >
        <InputField
          {...register('name', { value: props.toy?.name! })}
          label={t('components.toyForm.name')}
          type="text"
          error={errors?.name}
        />
        <button
          type="submit"
          className="mt-8 mb-4 linear self-center inline-block rounded-xl bg-brand-500 py-3 w-full text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {t(`components.toyForm.save`)}
        </button>
      </form>
    </Card>
  );
};

export default ToyForm;
