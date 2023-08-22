import React from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function Field(props: {
  id: string;
  label: string;
  element: JSX.Element;
  error?: FieldError;
}) {
  const { label, id, error, element } = props;

  const { t } = useTranslation();

  return (
    <div className="mt-3">
      <label
        htmlFor={id}
        className="text-sm text-navy-700 dark:text-white ml-3 font-bold"
      >
        {label}
      </label>
      {element}
      {error && (
        <span className="text-sm text-red-500 dark:!text-red-400 px-3 mb-3 mt-3">
          {t(error.message!)}
        </span>
      )}
    </div>
  );
}

export default Field;
