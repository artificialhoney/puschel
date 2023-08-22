import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import {
  useFindActivePlayQuery,
  useFindPlayByNameQuery,
  useFindToysQuery,
} from '../../../../gql';
import { dataSource } from '../../../../static';
import RunListCard from '../components/RunListCard';
import TimelineCard from '../components/TimelineCard';
import Toolbar from '../components/Toolbar';

const ViewPlay = () => {
  const params = useParams();
  const playQuery = useFindPlayByNameQuery(dataSource(), { name: params.id! });
  const activePlayQuery = useFindActivePlayQuery(dataSource(), undefined, {
    refetchInterval: 1000,
  });

  const active =
    playQuery?.data?.findPlayByName?.id ===
    activePlayQuery?.data?.findActivePlay?.id;

  const toysQuery = useFindToysQuery(dataSource());

  const findToy = (id: number) => {
    return toysQuery.data?.findToys?.find((t) => t.id === id);
  };

  const activeRun =
    active && activePlayQuery.data?.findActivePlay
      ? activePlayQuery.data!.findActivePlay!.runs![0]
      : undefined;

  const lastRuns = active
    ? activePlayQuery.data?.findActivePlay?.runs?.slice(0, 5)
    : playQuery?.data?.findPlayByName?.runs?.slice(0, 5);

  return (
    <>
      <StandardGrid extra="mb-6">
        <p className="col-span-1 md:col-span-2 text-navy-700 dark:text-white">
          {playQuery.data?.findPlayByName?.description}
        </p>
        {playQuery.data?.findPlayByName && (
          <div className="text-2xl flex text-gray-600 self-start flex-row justify-start lg:justify-end">
            <Toolbar active={active} play={playQuery.data!.findPlayByName} />
          </div>
        )}
      </StandardGrid>
      <StandardGrid>
        <div className="col-span-2">
          {playQuery.data?.findPlayByName &&
            playQuery.data!.findPlayByName!.timelines?.map((timeline, i) => {
              return (
                <TimelineCard
                  key={i}
                  timeline={timeline}
                  toy={findToy(timeline.toyId!)!}
                  activeRun={activeRun!}
                />
              );
            })}
        </div>
        <RunListCard runs={lastRuns || []} activeRun={activeRun!} />
      </StandardGrid>
    </>
  );
};

export default ViewPlay;
