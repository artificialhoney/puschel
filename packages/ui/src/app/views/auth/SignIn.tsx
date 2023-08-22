import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InputField from '../../components/fields/InputField';
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_CURRENT_USER_ID,
} from '../../static';

type LoginDto = { username: string; password: string };

export default function SignIn() {
  const { t } = useTranslation();
  const [error, setError] = useState(false);

  const onLogin = async (login) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      });

      if (response.access_token) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY,
          response.access_token
        );
        localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_ID, response.user_id);
        document.location = '/';
      }
    } catch (e) {
      setError(true);
    }
  };

  const resolver: Resolver<LoginDto> = async (l) => {
    return {
      values: l,
      errors: {},
    };
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({ resolver });

  const onSubmit = handleSubmit((login, data) => onLogin(login));

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <form
        onSubmit={onSubmit}
        className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          {t('components.signIn.title')}
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          {t('components.signIn.hint')}
        </p>
        <div className="pb-4">
          <InputField
            label={t('components.signIn.username')}
            {...register('username')}
            type="text"
          />
          <InputField
            label={t('components.signIn.password')}
            {...register('password')}
            type="password"
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 dark:!text-red-400 px-1.5 mb-4">
            {t('components.signIn.error')}
          </div>
        )}
        <button
          type="submit"
          className="linear w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {t('components.signIn.title')}
        </button>
      </form>
    </div>
  );
}
