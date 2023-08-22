const Tick = (props: {
  index: number;
  tick: {
    id: string;
    value: number;
    percent: number;
  };
  count: number;
  format?: (value: number) => string;
}) => {
  const { tick, format, index, count } = props;
  const showLabel = !(tick.value % (60 * 60 * 1000)) || count === index + 1;

  return (
    <>
      <div
        className={`absolute mt-[20px] w-[1px] h-[5px] bg-brand-500 dark:bg-brand-400 ${
          showLabel ? 'mt-[15px] h-[15px]' : ''
        }`}
        style={{ left: `${tick.percent}%` }}
      />
      {showLabel && (
        <div
          className={`absolute mt-[28px] text-xs text-navy-700 dark:text-white -translate-x-1/2`}
          style={{
            left: `${tick.percent}%`,
          }}
        >
          {format ? format(tick.value) : tick.value}
        </div>
      )}
    </>
  );
};

export default Tick;
