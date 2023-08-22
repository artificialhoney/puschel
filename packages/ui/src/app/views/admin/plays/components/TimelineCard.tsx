import { SatisfierType } from '@xx/models';
import { useTranslation } from 'react-i18next';

import Card from '../../../../components/card';
import Field from '../../../../components/fields/Field';
import ReactTimeline from '../../../../components/timeline';
import { Ride, Run, Timeline, Toy } from '../../../../gql';
import {
  activeRide,
  formatTimelineRemainingTime,
  formatTimelineTick,
  ridesOverallLength,
  ridesToIntervals,
} from '../../../../static';
import ManualSatisifer from './ManualSatisfier';
import TimelineEventChart from './TimelineEventChart';

const TimelineCard = (props: {
  timeline: Timeline;
  toy: Toy;
  activeRun: Run;
}) => {
  const { timeline, toy, activeRun } = props;

  const { t, i18n } = useTranslation();

  const ridesToLabels = (rides: Ride[]) => {
    return rides.map((r, i) => {
      return t(
        `components.rideForm.satisfier.types.${r.satisfier!.type}.title`
      );
    });
  };

  const currentRide =
    timeline && activeRun
      ? activeRide(timeline.rides!, activeRun.runTime!)
      : undefined;

  const renderSatisfierView = (type) => {
    switch (type) {
      case SatisfierType.MANUAL:
        return <ManualSatisifer activeRun={activeRun} />;
    }
  };

  return (
    <Card extra="w-full h-full p-4">
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white flex">
          {toy?.name}
          {activeRun && (
            <span className="relative flex h-3 w-3 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 dark:bg-brand-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500 dark:bg-brand-400"></span>
            </span>
          )}
        </h4>
      </div>
      {toy && <TimelineEventChart toy={toy} activeRun={activeRun} />}
      <Field
        id={`rides`}
        label={
          activeRun
            ? formatTimelineRemainingTime(
                activeRun!.runTime,
                ridesOverallLength(timeline.rides!),
                i18n.language
              )
            : t('components.timelineCard.stopped')
        }
        element={
          <ReactTimeline
            markers={activeRun && [+activeRun.runTime!]}
            formatTick={formatTimelineTick}
            intervals={ridesToIntervals(timeline.rides!)}
            labels={ridesToLabels(timeline.rides!)}
            readonly
          />
        }
      />
      <div>
        {activeRun &&
          currentRide &&
          renderSatisfierView(currentRide.satisfier!.type)}
      </div>
    </Card>
  );
};

export default TimelineCard;
