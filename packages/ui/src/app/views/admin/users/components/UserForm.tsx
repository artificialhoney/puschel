import { useQueryClient } from '@tanstack/react-query';
import { User as UserModel, UserGender } from '@xx/models';
import { validate } from 'class-validator';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Card from '../../../../components/card';
import ImageField from '../../../../components/fields/ImageField';
import InputField from '../../../../components/fields/InputField';
import SelectField from '../../../../components/fields/SelectField';
import TextField from '../../../../components/fields/TextField';
import {
  useCreateUserMutation,
  User,
  UserDto,
  useUpdateUserMutation,
} from '../../../../gql';
import { dataSource, transformValidationErrors } from '../../../../static';

const UserForm = (props: { user?: User }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createMutation = useCreateUserMutation(dataSource());
  const updateMutation = useUpdateUserMutation(dataSource());

  const n = useNavigate();

  const onSave = (user) => {
    if (props.user) {
      updateMutation.mutate(
        { user: { ...user, id: props.user.id } },
        {
          onSuccess: async () => {
            n('/users');
          },
        }
      );
    } else {
      createMutation.mutate({ user }, { onSuccess: () => n('/users') });
    }
  };

  const genderOptions = Object.values(UserGender).map((value) => {
    return {
      value,
      label: t(`components.userForm.genders.${value}.title`),
    };
  });

  const resolver: Resolver<UserDto> = async (u) => {
    const model = Object.assign(new UserModel(), u);
    const validation = await validate(model);
    return {
      values: model,
      errors: transformValidationErrors(validation),
    };
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserDto>({ resolver });

  const onSubmit = handleSubmit((data) => onSave(data));

  return (
    <Card extra="w-full h-full p-4 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="pb-4 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {t('components.userForm.title')}
        </h4>
        <p className="mt-2 text-base text-gray-600">
          {t('components.userForm.hint')}
        </p>
      </div>
      <form className="block" onSubmit={onSubmit}>
        <InputField
          {...register('username', { value: props.user?.username! })}
          label={t('components.userForm.username')}
          type="text"
          error={errors?.username}
        />
        <InputField
          {...register('password')}
          label={t('components.userForm.password')}
          type="password"
          error={errors?.password}
        />

        <TextField
          {...register('description', { value: props.user?.description! })}
          label={t('components.userForm.description')}
          error={errors?.description}
        />

        <Controller
          name="gender"
          control={control}
          defaultValue={props.user?.gender!}
          render={({ field }) => {
            return (
              <SelectField
                label={t('components.userForm.gender')}
                placeholder={t('components.userForm.genderPlaceholder')!}
                options={genderOptions}
                error={errors.gender}
                id="gender"
                value={genderOptions.find((t) => t.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
              />
            );
          }}
        />

        <Controller
          name="avatar"
          control={control}
          defaultValue={props.user?.avatar!}
          render={({ field }) => (
            <ImageField
              error={errors?.avatar}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              label={t('components.userForm.avatar')}
              placeholder={t('components.userForm.avatarPlaceholder')!}
              description={t('components.userForm.avatarDescription')!}
            />
          )}
        />
        <button
          type="submit"
          className="mt-8 mb-4 linear self-center inline-block rounded-xl bg-brand-500 py-3 w-full text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {t(`components.userForm.${props.user ? 'save' : 'create'}`)}
        </button>
      </form>
    </Card>
  );
};

export default UserForm;
