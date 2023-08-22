const Handle = (props: {
  domain: Array<number>;
  handle: {
    id: string;
    value: number;
    percent: number;
  };
  getHandleProps: (id: string) => any;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
}) => {
  const { domain, handle, getHandleProps, disabled, error, readonly } = props;
  const [min, max] = domain;

  const leftPosition = `${handle.percent}%`;

  return (
    <>
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 w-[24px] h-[24px] bg-transparent ${
          readonly ? '' : 'cursor-pointer'
        }`}
        style={{ left: leftPosition }}
        {...getHandleProps(handle.id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={handle.value}
        className={`absolute flex -translate-x-1/2 -translate-y-1/2 z-10 w-[10px] h-[24px] rounded-xl shadow-xl ${
          disabled
            ? 'bg-gray-500 dark:bg-gray-400'
            : 'bg-brand-500 dark:bg-brand-400'
        }`}
        style={{ left: leftPosition }}
      >
        <div
          className={`w-[2px] h-[12px] m-auto rounded-md transition-colors	${
            error ? 'bg-red-500 dark:bg-red-400' : 'bg-white dark:bg-navy-700'
          }`}
        />
      </div>
    </>
  );
};

export default Handle;
