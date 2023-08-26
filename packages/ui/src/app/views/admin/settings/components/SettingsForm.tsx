import { Settings as SettingsModel } from '@puschel/models';
import { useQueryClient } from '@tanstack/react-query';
import { validate } from 'class-validator';
import { Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Card from '../../../../components/card';
import InputField from '../../../../components/fields/InputField';
import {
  Settings,
  SettingsDto,
  useUpdateSettingsMutation,
} from '../../../../gql';
import { dataSource, transformValidationErrors } from '../../../../static';

const SettingsForm = (props: { settings: Settings }) => {
  const { t } = useTranslation();
  const n = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useUpdateSettingsMutation(dataSource());

  const onSave = (settings) => {
    mutation.mutate(
      { settings },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries();
          n('/');
        },
      }
    );
  };

  const resolver: Resolver<SettingsDto> = async (s) => {
    const model = Object.assign(new SettingsModel(), s);
    const validation = await validate(model);
    return {
      values: model,
      errors: transformValidationErrors(validation),
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsDto>({ resolver });

  const onSubmit = handleSubmit((data) => onSave(data));

  return (
    <Card extra="w-full h-full p-4 col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
      <div className="pb-4 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {t('components.settingsForm.title')}
        </h4>
        <p className="mt-2 text-base text-gray-600">
          {t('components.settingsForm.hint')}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <InputField
          {...register('adminPassword')}
          label={t('components.settingsForm.adminPassword')}
          type="password"
          error={errors?.adminPassword}
        />
        <InputField
          {...register('wifiSsid', { value: props.settings?.wifiSsid! })}
          label={t('components.settingsForm.wifiSsid')}
          type="text"
          error={errors?.wifiSsid}
        />
        <InputField
          {...register('wifiPassword')}
          label={t('components.settingsForm.wifiPassword')}
          type="password"
          error={errors?.wifiPassword}
        />
        <button
          type="submit"
          className="mt-8 mb-4 linear self-center inline-block rounded-xl bg-brand-500 py-3 w-full text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {t(`components.settingsForm.save`)}
        </button>
      </form>
    </Card>
  );
};

export default SettingsForm;
