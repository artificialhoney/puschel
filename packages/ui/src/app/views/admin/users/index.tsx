import StandardGrid from '../../../components/grid/StandardGrid';
import { useFindUsersQuery } from '../../../gql';
import { dataSource } from '../../../static';
import UserCard from './components/UserCard';

const UsersView = () => {
  const query = useFindUsersQuery(dataSource());

  return (
    <StandardGrid>
      {query.data?.findUsers.map((user, i) => {
        return <UserCard user={user} key={i} />;
      })}
    </StandardGrid>
  );
};

export default UsersView;
