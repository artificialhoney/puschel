import { useTranslation } from 'react-i18next';
import { MdOutlineTimer } from 'react-icons/md';

import Card from '../../../../components/card';
import StarRating from '../../../../components/rating/StarRating';
import { Run } from '../../../../gql';
import { formatDate, formatTime, overallRating } from '../../../../static';

const RunListCard = (props: { runs: Run[]; activeRun: Run }) => {
  const { runs, activeRun } = props;

  const { t, i18n } = useTranslation();

  return (
    <Card extra="items-center w-full h-full p-4">
      <div className="mb-4 w-full">
        <h4 className="mb-4 text-xl font-bold text-navy-700 dark:text-white">
          {t('components.runListCard.title')}
        </h4>
        {runs.map((r, i) => {
          const rating = r.ratings!.length > 0 ? overallRating(r) : undefined;

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
                      {formatDate(r.startDate, i18n.language)}
                    </h5>
                    {rating != null && (
                      <div className="text-xl self-start">
                        <StarRating disabled={true} value={rating} />
                      </div>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-gray-600">
                    <MdOutlineTimer />
                    <p className="text-sm font-bold">
                      {formatTime(r.startDate, i18n.language)}
                      {' - '}
                      {formatTime(
                        new Date(r.startDate).getTime() + r.runTime!,
                        i18n.language
                      )}
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

export default RunListCard;
