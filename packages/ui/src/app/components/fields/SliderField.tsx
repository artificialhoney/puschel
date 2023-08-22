import React, { forwardRef } from 'react';
import {
  GetHandleProps,
  GetRailProps,
  GetTrackProps,
  Handles,
  Rail,
  Slider,
  SliderItem,
  Tracks,
} from 'react-compound-slider';
import { FieldError } from 'react-hook-form';

import Field from './Field';

interface SliderRailProps {
  getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => {
  return <div {...getRailProps()} />;
};

interface HandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  disabled?: boolean;
}

export const Handle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <>
      <div
        className="z-20 bg-none cursor-pointer absolute w-8 h-12 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${percent}%`,
        }}
        {...getHandleProps(id)}
      />
      <div
        className={`z-10 w-6 h-6 rounded-full absolute shadow-xl -translate-x-1/2 -translate-y-1/2 ${
          disabled
            ? 'bg-gray-500 dark:bg-gray-400'
            : 'bg-brand-500 dark:bg-brand-400'
        }`}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
        }}
      />
    </>
  );
};

interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
  disabled = false,
}) => {
  return (
    <div
      className={`absolute translate-x-0 -translate-y-1/2 z-0 h-4 rounded-xl border-2 cursor-pointer ${
        disabled === true
          ? '!bg-gray-100 dark:!bg-white/5'
          : 'border-gray-200 dark:!border-white/10'
      }`}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

const SliderField = forwardRef(
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
    const { label, id, error, disabled, value, onChange, ...rest } = props;

    return (
      <Field
        id={id}
        label={label}
        error={error}
        element={
          <Slider
            mode={1}
            step={1}
            domain={[0, 10]}
            onUpdate={(value) => onChange(value[0])}
            values={[value]}
            disabled={disabled}
            className="mt-4 w-full h-4"
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="relative mx-2">
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[0, 10]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="relative mx-2">
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        }
      />
    );
  }
);

export default SliderField;
