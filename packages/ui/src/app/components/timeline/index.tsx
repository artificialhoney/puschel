import { scaleTime } from 'd3-scale';
import { format } from 'date-fns';
import React from 'react';
import { Handles, Rail, Slider, Ticks, Tracks } from 'react-compound-slider';
import { MdAddRoad, MdDeleteSweep, MdZoomIn, MdZoomOut } from 'react-icons/md';

import Handle from './components/Handle';
import SliderRail from './components/Rail';
import Tick from './components/Tick';
import Track from './components/Track';

class Timeline extends React.Component<{
  markers?: Array<number>;
  intervals?: Array<number>;
  labels?: Array<string>;
  formatTick?: (value: number) => string;
  onDelete?: (event) => void;
  onAddTrack?: (event) => void;
  onEditTrack?: (event, index) => void;
  onRemoveTrack?: (event, index) => void;
  onUpdate?: (value: { error: boolean; time: string }) => void;
  onChange?: (value) => void;
  readonly?: boolean;
  error?: boolean;
}> {
  static defaultProps = {
    formatTick: (ms) => format(Date.UTC(70, 0, 0, 0, 0, 0, ms), 'HH:mm'),
    error: false,
  };

  state: {
    domain: [number, number] | null;
    step: number;
    ticks: number;
  } = {
    domain: null,
    step: 0,
    ticks: 0,
  };

  constructor(props) {
    super(props);
  }

  static stateForDomain = (domain, state) => {
    return {
      ...state,
      domain,
      step: 60 * 1000,
      ticks: Math.round((domain[1] - domain[0]) / 60 / 1000),
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextIntervals = nextProps.intervals;
    const nextlastItem = nextIntervals[nextIntervals.length - 1];

    if (!prevState.domain || prevState.domain[1] < nextlastItem) {
      const domain = [
        (prevState.domain && prevState.domain[0]) || 0,
        nextlastItem + 30 * 60 * 1000 - (nextlastItem % (30 * 60 * 1000)),
      ];
      return Timeline.stateForDomain(domain, prevState);
    }
    return null;
  }

  onChange = (newTime) => {
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }
    onChange!(newTime);
  };

  onUpdate = (newTime) => {
    const { onUpdate } = this.props;
    if (!onUpdate) {
      return;
    }
    onUpdate!({ error: false, time: newTime });
  };

  onZoomIn = (event) => {
    event.preventDefault();
    this.setState(
      Timeline.stateForDomain(
        [this.state.domain![0], this.state.domain![1] / 2],
        this.state
      )
    );
  };

  onZoomOut = (event) => {
    event.preventDefault();
    this.setState(
      Timeline.stateForDomain(
        [this.state.domain![0], this.state.domain![1] * 2],
        this.state
      )
    );
  };

  getDateTicks = () => {
    const { ticks } = this.state;
    return scaleTime()
      .domain(this.state.domain)
      .ticks(ticks)
      .map((t) => +t);
  };

  getMarkerPosition = (marker: number) => {
    const { domain } = this.state;
    const start = domain![0];
    const end = domain![1];
    const current = marker;

    const elapsed = current - start;
    return (elapsed / (end - start)) * 100;
  };

  render() {
    const {
      error,
      labels,
      intervals,
      markers,
      formatTick,
      onDelete,
      onEditTrack,
      onRemoveTrack,
      onAddTrack,
      readonly,
    } = this.props;

    const domain = this.state.domain!;

    return (
      <div className="flex flex-col">
        <div className="relative w-full h-12 pt-8 pb-12 pr-2">
          <Slider
            disabled={readonly}
            mode={3}
            step={this.state.step}
            domain={domain}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            values={intervals!}
            rootStyle={{ position: 'relative', width: '100%' }}
          >
            <Rail>
              {({ getRailProps }) => (
                <SliderRail getRailProps={getRailProps} readonly={readonly} />
              )}
            </Rail>

            <Handles>
              {({ handles, getHandleProps }) => (
                <>
                  {handles.map((handle, index) => (
                    <Handle
                      readonly={readonly}
                      error={error}
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </>
              )}
            </Handles>

            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <>
                  {tracks?.map(({ id, source, target }, index) => (
                    <Track
                      label={labels && labels[index]}
                      readonly={readonly}
                      error={error}
                      key={id}
                      onEdit={(e) => onEditTrack!(e, index)}
                      onRemove={(e) => onRemoveTrack!(e, index)}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </>
              )}
            </Tracks>

            <Ticks values={this.getDateTicks()}>
              {({ ticks }) => (
                <>
                  {ticks.map((tick, index) => (
                    <Tick
                      index={index}
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={formatTick}
                    />
                  ))}
                </>
              )}
            </Ticks>
          </Slider>
          {markers?.map((m, i) => {
            return (
              <div
                className="absolute animate-pulse top-0 h-16 w-[2px] bg-red-500 dark:bg-red-400"
                key={i}
                style={{
                  left: `${this.getMarkerPosition(m)}%`,
                }}
              ></div>
            );
          })}
        </div>
        {!readonly && (
          <div className="self-end flex text-gray-600 dark:text-white text-xl gap-2 cursor-pointer">
            <MdAddRoad onClick={onAddTrack} />
            <MdZoomIn onClick={this.onZoomIn} />
            <MdZoomOut onClick={this.onZoomOut} />
            <MdDeleteSweep onClick={onDelete} />
          </div>
        )}
      </div>
    );
  }
}

export default Timeline;
