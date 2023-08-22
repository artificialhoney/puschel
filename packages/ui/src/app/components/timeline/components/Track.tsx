import { MdEditRoad, MdRemoveRoad } from 'react-icons/md';

const Track = (props: {
  error?: boolean;
  label?: string;
  source: {
    id?: string;
    value: number;
    percent: number;
  };
  target: {
    id?: string;
    value: number;
    percent: number;
  };
  getTrackProps: () => any;
  onEdit: (event) => void;
  onRemove: (event) => void;
  readonly?: boolean;
  disabled?: boolean;
}) => {
  const {
    error,
    label,
    source,
    target,
    disabled,
    getTrackProps,
    onEdit,
    onRemove,
    readonly,
  } = props;
  return (
    <>
      <div
        className={`absolute flex -translate-y-1/2 h-[50px] cusrsor-pointer transition-colors z-0 border-x ${
          disabled
            ? 'border-x-gray-500/80 dark:border-x-gray-400/80 bg-gray-500/50 dark:bg-gray-400/50'
            : ''
        } ${
          error
            ? 'border-x-red-500/80 dark:border-x-red-400/80 bg-red-500/50 dark:bg-red-400/50'
            : 'border-x-brand-500/80 dark:border-x-brand-400/80 bg-brand-500/50 dark:bg-brand-400/50'
        }`}
        style={{
          left: `${source.percent}%`,
          width: `calc(${target.percent - source.percent}% + 1px)`,
        }}
        {...getTrackProps()}
      />
      {label && (
        <div
          className="absolute t-0 h-full ml-2 leading-none dark:text-gray-200 text-white text-xs pointer-events-none"
          style={{
            left: `${source.percent}%`,
          }}
        >
          {label}
        </div>
      )}
      {!readonly && (
        <div
          className="absolute -translate-y-1/2 flex-col items-center flex dark:text-gray-200 text-white text-xl pointer-events-none"
          style={{
            left: `${source.percent}%`,
            width: `calc(${target.percent - source.percent}% + 1px)`,
          }}
        >
          <div className="flex gap-2 self-center h-full cursor-pointer pointer-events-auto">
            <MdEditRoad onClick={onEdit} />
            <MdRemoveRoad onClick={onRemove} />
          </div>
        </div>
      )}
    </>
  );
};

Track.defaultProps = { disabled: false };

export default Track;
