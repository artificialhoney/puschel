export const Rail = (props: {
  getRailProps: () => any;
  readonly?: boolean;
}) => {
  const { getRailProps, readonly } = props;
  return (
    <>
      <div
        className={`absolute w-full h-[50px] -translate-y-1/2 ${
          readonly ? '' : 'cursor-pointer'
        }`}
        {...getRailProps()}
      />
      <div className="absolute w-full h-[50px] -translate-y-1/2 pointer-events-none bg-gray-100 dark:bg-brand-200 border-b border-b-gray-500 dark:border-b-gray-400" />
    </>
  );
};

export default Rail;
