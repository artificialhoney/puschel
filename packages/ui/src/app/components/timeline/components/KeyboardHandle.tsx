const KeyboardHandle = (props: {
  domain: Array<number>;
  handle: {
    id: string;
    value: number;
    percent: number;
  };
  getHandleProps: (id: string) => any;
  disabled: boolean;
}) => {
  const { domain, handle, getHandleProps, disabled } = props;

  const [min, max] = domain;

  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={handle.value}
      className="absolute -translate-x-1/2  -translate-y-1/2 z-10 w-px-24 h-px-24 rounded-3xl shadow-xl"
      style={{
        left: `${handle.percent}%`,
        backgroundColor: disabled ? '#666' : '#ffc400',
      }}
      {...getHandleProps(handle.id)}
    />
  );
};

export default KeyboardHandle;
