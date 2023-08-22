import { forwardRef } from 'react';

const SwitchField = forwardRef(
  (
    props: {
      label: string;
      description?: string;
      placeholder?: string;
      [key: string]: any;
    },
    ref
  ) => {
    const { id, label, placeholder, description, disabled, ...rest } = props;

    return (
      <div className="mb-3">
        <div className={`flex justify-between mt-3 items-center`}>
          <label
            htmlFor={id}
            className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%] text-sm text-navy-700 dark:text-white ml-3 font-bold"
          >
            <h5 className="text-sm font-bold text-navy-700 dark:text-white">
              {label}
            </h5>
            <p className={`text-sm text-gray-600`}>{description}</p>
          </label>
          <div>
            <input
              ref={ref as any}
              disabled={disabled}
              {...rest}
              type="checkbox"
              className={`relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s]
      before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
      before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
      checked:before:translate-x-[22px] hover:cursor-pointer
      dark:bg-white/5 ${
        disabled
          ? 'checked:bg-gray-500 dark:checked:bg-gray-400'
          : 'checked:bg-brand-500 dark:checked:bg-brand-400'
      }`}
              id={id}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default SwitchField;
