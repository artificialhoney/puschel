import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Card from '../../../../components/card';
import StarRating from '../../../../components/rating/StarRating';
import { Play } from '../../../../gql';
import { overallRating, playDuration } from '../../../../static';
import Toolbar from './Toolbar';

const PlayCard = (props: { play: Play; active: boolean }) => {
  const { play, active } = props;

  const { i18n } = useTranslation();

  const duration = playDuration(i18n.language, ...play.timelines!);

  const rating =
    play.runs!.length > 0 && play.runs![0].ratings!.length > 0
      ? overallRating(play.runs![0])
      : undefined;

  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}>
      <div className="h-full w-full">
        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <Link
              to={`/plays/${play.name}`}
              className="text-lg font-bold text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400"
            >
              {play.name}
            </Link>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {play.description}
            </p>
          </div>
          <div className="text-xl flex md:mt-2 lg:mt-0 text-gray-600">
            <Toolbar active={active} play={play} />
          </div>
        </div>
        <div className="px-1 flex items-center justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-navy-700 dark:text-white"></p>
            {duration}
          </div>
          {rating != null && (
            <div className="flex">
              <StarRating value={rating} disabled={true} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PlayCard;
