import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6">
      <p className="mb-6 text-center text-sm text-gray-600 md:text-base lg:mb-0">
        ©{new Date().getFullYear()} {t('components.footer.copyright')}
      </p>
      <ul className="flex flex-wrap items-center sm:flex-nowrap">
        <li className="mr-12">
          <a
            target="_blank"
            rel="nofollow noreferrer"
            href="https://artificialhoney.github.io/xx"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            {t('components.footer.support')}
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow noreferrer"
            href="https://artificialhoney.github.io/xx"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            {t('components.footer.blog')}
          </a>
        </li>
      </ul>
    </div>
  );
}
