import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import {
  useFindCurrentUserQuery,
  useFindUserByUsernameQuery,
} from '../../../../gql';
import { dataSource } from '../../../../static';
import UserForm from '../components/UserForm';

const EditUser = () => {
  const params = useParams();
  const query =
    params.id === 'me'
      ? useFindCurrentUserQuery(dataSource(), {}, { keepPreviousData: true })
      : useFindUserByUsernameQuery(dataSource(), {
          username: params.id!,
        });

  return (
    <StandardGrid>
      {query.data?.findUser && <UserForm user={query.data!.findUser} />}
    </StandardGrid>
  );
};

export default EditUser;
