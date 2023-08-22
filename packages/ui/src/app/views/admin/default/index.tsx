import StandardGrid from '../../../components/grid/StandardGrid';
import {
  useFindActivePlayQuery,
  useFindPlaysQuery,
  useFindToysQuery,
} from '../../../gql';
import { dataSource, flatRatings } from '../../../static';
import PlayCard from '../plays/components/PlayCard';
import TimelineCard from '../plays/components/TimelineCard';
import RatingListCard from '../users/components/RatingListCard';

const Dashboard = () => {
  const activePlayQuery = useFindActivePlayQuery(dataSource(), undefined, {
    refetchInterval: 1000,
  });

  const active = !!activePlayQuery?.data?.findActivePlay;

  const toysQuery = useFindToysQuery(dataSource());

  const playsQuery = useFindPlaysQuery(dataSource(), undefined, {
    enabled: !active,
  });

  const findToy = (id: number) => {
    return toysQuery.data?.findToys?.find((t) => t.id === id);
  };

  const activeRun = active
    ? activePlayQuery.data!.findActivePlay!.runs![0]
    : undefined;

  // const lastRuns = active && activePlayQuery.data!.findActivePlay!.runs!.slice(0, 5)

  return (
    <StandardGrid>
      {active ? (
        <div className="col-span-1 md:col-span-2">
          {activePlayQuery.data?.findActivePlay?.timelines?.map(
            (timeline, i) => {
              return (
                <TimelineCard
                  key={i}
                  timeline={timeline}
                  toy={findToy(timeline.toyId!)!}
                  activeRun={activeRun!}
                />
              );
            }
          )}
        </div>
      ) : (
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {playsQuery.data?.findPlays?.map((play, i) => {
            return <PlayCard play={play} active={false} key={i} />;
          })}{' '}
        </div>
      )}

      {playsQuery.data?.findPlays && (
        <RatingListCard
          ratings={flatRatings(...playsQuery.data!.findPlays)
            .sort((a, b) => a.score! - b.score!)
            .slice(0, 5)}
        />
      )}
    </StandardGrid>
  );
};

export default Dashboard;
