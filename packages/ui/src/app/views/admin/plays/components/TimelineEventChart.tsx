import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ChartComponent from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import {
  RideEvent,
  Run,
  Toy,
  useFindLastRideEventByRunQuery,
} from '../../../../gql';
import { dataSource, formatTime, isDarkMode } from '../../../../static';

const TimelineEventChart = (props: { toy: Toy; activeRun: Run }) => {
  const { toy, activeRun } = props;

  const [events, setEvents] = useState<RideEvent[]>([]);

  const findLastRideEventByRunQuery = useFindLastRideEventByRunQuery(
    dataSource(),
    { id: activeRun?.id },
    {
      refetchInterval: 1000,
      enabled: !!activeRun,
    }
  );

  const lineChartOptions: ApexOptions = {
    legend: {
      show: false,
    },

    theme: {
      mode: isDarkMode() ? 'dark' : 'light',
    },
    chart: {
      background: 'none',
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: false,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      x: {
        formatter(val: number, opts?: any): string {
          // const date = new Date(events[opts.dataPointIndex].date);
          return formatTime(val, i18n.language);
        },
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      range: 20,
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 1,
      labels: {
        show: false,
      },
    },
  };

  const { t, i18n } = useTranslation();

  const eventsToSeries = (events) => {
    return {
      name: toy.name,
      data: events.map((e, i) => ({
        x: e.date,
        y: e.payload.value,
      })),
      color: '#4318FF',
    };
  };

  useEffect(() => {
    if (!activeRun) {
      if (events.length > 0) {
        setEvents([]);
      }
      return;
    }
    const newEvent = findLastRideEventByRunQuery.data?.findLastRideEventByRun!;
    if (!newEvent || events.find((e) => e.id === newEvent.id)) {
      return;
    }

    setEvents([...events, newEvent].slice(0, 100));
  }, [
    findLastRideEventByRunQuery?.data?.findLastRideEventByRun,
    props.activeRun,
  ]);

  const series = eventsToSeries(events);

  return (
    <div className="flex w-full flex-col">
      <p className="mt-4 text-sm font-bold text-navy-700 dark:text-white pl-3">
        {series.data.length > 0
          ? t('components.timelineEventChart.intensity', {
              intensity: Math.round(
                series.data[series.data.length - 1]?.y * 100
              ),
            })
          : t('components.timelineEventChart.stopped')}
      </p>
      <div className="h-32 w-full">
        <ChartComponent
          options={lineChartOptions as any}
          type="line"
          width="100%"
          height="100%"
          series={[series as any]}
        />
      </div>
    </div>
  );
};

export default TimelineEventChart;
