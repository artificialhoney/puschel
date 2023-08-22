import StandardGrid from '../../../components/grid/StandardGrid';
import { useFindActivePlayQuery, useFindPlaysQuery } from '../../../gql';
import { dataSource } from '../../../static';
import PlayCard from './components/PlayCard';

const PlaysView = () => {
  const query = useFindPlaysQuery(dataSource());
  const playQuery = useFindActivePlayQuery(dataSource());

  return (
    <StandardGrid>
      {query.data?.findPlays.map((play, i) => {
        return (
          <PlayCard
            play={play}
            active={play.id === playQuery?.data?.findActivePlay?.id}
            key={i}
          />
        );
      })}
    </StandardGrid>
  );
};

export default PlaysView;
