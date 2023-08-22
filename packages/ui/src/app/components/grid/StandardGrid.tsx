const StandardGrid = ({
  children,
  extra,
}: {
  children: any;
  extra?: string;
}) => {
  return (
    <div className={`flex w-full flex-col gap-5 ${extra ? extra : ''}`}>
      <div className="w-full flex h-fit gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
};

export default StandardGrid;
