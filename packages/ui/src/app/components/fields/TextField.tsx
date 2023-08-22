import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import Field from './Field';

const TextField = forwardRef(
  (
    props: {
      label: string;
      placeholder?: string;
      type?: string;
      error?: FieldError;
      [key: string]: any;
    },
    ref
  ) => {
    const { label, id, error, disabled, ...rest } = props;

    return (
      <Field
        id={id}
        label={label}
        error={error}
        element={
          <textarea
            ref={ref as any}
            {...rest}
            rows={5}
            className={`mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              disabled === true
                ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                : error
                ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                : 'border-gray-200 dark:!border-white/10 dark:text-white'
            }`}
          ></textarea>
        }
      />
    );
  }
);

export default TextField;
