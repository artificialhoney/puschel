import StandardGrid from '../../../components/grid/StandardGrid';
import { useFindSettingsQuery } from '../../../gql';
import { dataSource } from '../../../static';
import SettingsForm from './components/SettingsForm';

const SettingsView = () => {
  const query = useFindSettingsQuery(dataSource());

  return (
    <StandardGrid>
      {query?.data?.findSettings && (
        <SettingsForm settings={query?.data?.findSettings} />
      )}
    </StandardGrid>
  );
};

export default SettingsView;
