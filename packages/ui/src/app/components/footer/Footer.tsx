import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base dark:text-white">
          ©{new Date().getFullYear()} {t('components.footer.copyright')}
        </p>
      </h5>
      <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href="https://artificialhoney.github.io/xx"
              className="text-sm text-gray-600 hover:text-gray-600 md:text-base dark:text-white dark:hover:text-white"
            >
              {t('components.footer.support')}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href="https://artificialhoney.github.io/xx"
              className="text-sm text-gray-600 hover:text-gray-600 md:text-base dark:text-white dark:hover:text-white"
            >
              {t('components.footer.blog')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
