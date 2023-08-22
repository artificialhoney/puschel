import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import { useFindToyByNameQuery } from '../../../../gql';
import { dataSource } from '../../../../static';
import ToyForm from '../components/ToyForm';

const EditToy = () => {
  const params = useParams();
  const query = useFindToyByNameQuery(dataSource(), { name: params.id! });

  return (
    <StandardGrid>
      {query?.data?.findToyByName && (
        <ToyForm toy={query?.data?.findToyByName} />
      )}
    </StandardGrid>
  );
};

export default EditToy;
