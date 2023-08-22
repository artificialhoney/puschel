import StandardGrid from '../../../components/grid/StandardGrid';
import { useFindToysQuery } from '../../../gql';
import { dataSource } from '../../../static';
import ToyCard from './components/ToyCard';

const ToysView = () => {
  const query = useFindToysQuery(dataSource());

  return (
    <StandardGrid>
      {query.data?.findToys.map((toy, i) => {
        return <ToyCard toy={toy} key={i} />;
      })}
    </StandardGrid>
  );
};

export default ToysView;
