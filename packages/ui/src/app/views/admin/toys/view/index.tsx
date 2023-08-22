import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import { useFindToyByNameQuery } from '../../../../gql';
import { dataSource } from '../../../../static';
import TimelineListCard from '../components/TimelineListCard';
import ToyCard from '../components/ToyCard';

const ViewToy = () => {
  const params = useParams();
  const query = useFindToyByNameQuery(dataSource(), { name: params.id! });

  return (
    <StandardGrid>
      {query.data?.findToyByName && (
        <>
          <ToyCard toy={query.data!.findToyByName} />
          <TimelineListCard
            timelines={query.data!.findToyByName.timelines!.slice(0, 5)}
          />
        </>
      )}
    </StandardGrid>
  );
};

export default ViewToy;
