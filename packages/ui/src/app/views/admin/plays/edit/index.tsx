import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import { useFindPlayByNameQuery } from '../../../../gql';
import { dataSource } from '../../../../static';
import PlayForm from '../components/PlayForm';

const EditPlay = () => {
  const params = useParams();
  const query = useFindPlayByNameQuery(dataSource(), { name: params.id! });

  return (
    <StandardGrid>
      {query?.data?.findPlayByName && (
        <PlayForm play={query?.data?.findPlayByName} />
      )}
    </StandardGrid>
  );
};

export default EditPlay;
