import { useParams } from 'react-router-dom';

import StandardGrid from '../../../../components/grid/StandardGrid';
import { useFindUserByUsernameQuery } from '../../../../gql';
import { dataSource } from '../../../../static';
import RatingListCard from '../components/RatingListCard';
import UserCard from '../components/UserCard';

const ViewUser = () => {
  const params = useParams();
  const query = useFindUserByUsernameQuery(dataSource(), {
    username: params.id!,
  });

  return (
    <StandardGrid>
      {query.data?.findUser && (
        <>
          <UserCard user={query.data!.findUser} />
          <RatingListCard ratings={query.data!.findUser.ratings!.slice(0, 5)} />
        </>
      )}
    </StandardGrid>
  );
};

export default ViewUser;
