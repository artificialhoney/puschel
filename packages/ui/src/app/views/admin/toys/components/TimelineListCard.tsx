import { useTranslation } from 'react-i18next';
import { MdTimelapse } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Card from '../../../../components/card';
import { Timeline } from '../../../../gql';
import { playDuration as durationForTimelines } from '../../../../static';

const TimelineListCard = (props: { timelines: Timeline[] }) => {
  const { timelines } = props;

  const { t, i18n } = useTranslation();

  return (
    <Card extra={'items-center w-full h-full p-4'}>
      <div className="mb-4 w-full">
        <h4 className="mb-4 text-xl font-bold text-navy-700 dark:text-white">
          {t('components.timelineListCard.title')}
        </h4>
        {timelines.map((t, i) => {
          return (
            <div
              key={i}
              className="flex w-full items-end justify-between gap-4 mb-[16px] rounded-xl p-1.5 bg-white dark:!bg-navy-700 "
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-lightPrimary dark:!bg-navy-900 ">
                  <h5 className="text-[34px] font-bold text-navy-700 dark:text-white ">
                    {i + 1}
                  </h5>
                </div>
                <div className="flex flex-col grow">
                  <div className="flex justify-between w-full">
                    <h5 className="text-base font-bold leading-6 text-navy-700 dark:text-white ">
                      <Link
                        className="hover:text-brand-500 dark:hover:text-brand-400"
                        to={`/plays/${t.play!.name}`}
                      >
                        {t.play!.name}
                      </Link>
                    </h5>
                    <div className="text-xl self-start"></div>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-gray-600">
                    <MdTimelapse />
                    <p className="text-sm font-bold">
                      {durationForTimelines(i18n.language, t)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TimelineListCard;
