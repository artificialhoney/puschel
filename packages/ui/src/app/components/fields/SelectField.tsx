import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import Select from 'react-select';

import Field from './Field';

const SelectField = forwardRef(
  (
    props: {
      label: string;
      options: { value: any; label: string }[];
      multi?: boolean;
      error?: FieldError;
      [key: string]: any;
    },
    ref
  ) => {
    const {
      label,
      id,
      placeholder,
      error,
      disabled,
      options,
      value,
      onChange,
      multi,
      ...rest
    } = props;

    return (
      <Field
        {...rest}
        error={error}
        id={id}
        label={label}
        element={
          <Select
            {...rest}
            className=""
            options={options as any}
            isDisabled={disabled}
            placeholder={placeholder}
            unstyled={true}
            id={id}
            onChange={onChange}
            value={value}
            isMulti={multi}
            classNames={{
              multiValueRemove: () =>
                'text-navy-900 dark:text-white cursor-pointer',
              clearIndicator: () =>
                'text-navy-900 dark:text-white cursor-pointer',
              singleValue: () => 'text-navy-900 dark:text-white font-bold',
              container: () =>
                `mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                  disabled === true
                    ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                    : error
                    ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                    : 'border-gray-200 dark:!border-white/10 dark:text-white'
                }`,
              dropdownIndicator: () =>
                'text-gray-200 dark:!border-white/10 cursor-pointer',
              control: () => 'w-full',
              menu: () => 'w-full right-0 z-50',
              menuList: () =>
                'top-1 transition-all duration-300 ease-in-out rounded-xl bg-white py-3 px-4 text-sm shadow-md dark:!bg-navy-700 z-50 border border-gray-200 dark:!border-white/10 pt-4 flex flex-col gap-4',
              option: () =>
                'hover:text-black flex !cursor-pointer items-center text-navy-900 dark:text-white font-medium hover:text-brand-500 dark:hover:text-brand-400',
            }}
          />
        }
      />
    );
  }
);
export default SelectField;
