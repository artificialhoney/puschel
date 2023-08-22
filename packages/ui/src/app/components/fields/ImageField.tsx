import React, { forwardRef, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldError } from 'react-hook-form';
import { MdFileUpload } from 'react-icons/md';

import Field from './Field';

const ImageField = forwardRef(
  (
    props: {
      label: string;
      description?: string;
      placeholder?: string;
      error?: FieldError;
      [key: string]: any;
    },
    ref
  ) => {
    const {
      label,
      id,
      placeholder,
      description,
      disabled,
      value,
      error,
      onChange,
      ...rest
    } = props;

    const [file, setFile] = useState(value);

    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target!.result as string;
        setFile(image);
        onChange(image);
      };
      reader.readAsDataURL(file);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      maxSize: 2 * 1024 * 1024,
      maxFiles: 1,
      disabled,
    });

    return (
      <Field
        id={id}
        label={label}
        error={error}
        element={
          <div
            {...getRootProps()}
            className="mt-2 cursor-pointer rounded-xl bg-lightPrimary dark:!bg-navy-700"
          >
            <input id={id} {...getInputProps()} ref={ref as any} {...rest} />
            <div
              className={`mt-2 flex flex-col w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                disabled === true
                  ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                  : error
                  ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                  : 'border-gray-200 dark:!border-white/10 dark:text-white'
              }`}
            >
              {file && <img className="h-20 my-4" src={`data:${file}`} />}
              <MdFileUpload className="text-[40px] text-brand-500 dark:text-white" />
              <span className="text-xl font-bold text-brand-500 dark:text-white">
                {placeholder}
              </span>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {description}
              </p>
            </div>
          </div>
        }
      />
    );
  }
);

export default ImageField;
