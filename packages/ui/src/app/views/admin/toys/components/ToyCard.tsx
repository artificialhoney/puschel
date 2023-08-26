import '../../../../i18n/config';

import { ToyType } from '@puschel/models';
import { useTranslation } from 'react-i18next';
import { MdEditDocument } from 'react-icons/md';
import { Link } from 'react-router-dom';

import fantasyCup from '../../../../../assets/img/toys/fantasy-cup.png';
import jefferson from '../../../../../assets/img/toys/jefferson.png';
import lovenseLush from '../../../../../assets/img/toys/lovense-lush.png';
import pulseUnion from '../../../../../assets/img/toys/pulse-union.png';
import Card from '../../../../components/card';
import { Toy } from '../../../../gql';

const ToyCard = (props: { toy: Toy }) => {
  const { toy } = props;
  const { t } = useTranslation();

  const getImage = (type) => {
    switch (type) {
      case ToyType.LOVENSE_LUSH:
        return lovenseLush;
      case ToyType.FANTASY_CUP:
        return fantasyCup;
      case ToyType.PULSE_UNION:
        return pulseUnion;
      case ToyType.JEFFERSON:
        return jefferson;
    }
  };

  return (
    <Card extra={`flex flex-col w-full h-full p-4`}>
      <div className="h-full w-full">
        <div className="relative w-full bg-gray-100 dark:bg-navy-900/30 rounded-xl">
          <Link to={`/toys/${toy.name}`}>
            <img
              src={getImage(toy.type)}
              className="mb-3 h-full w-full 3xl:h-full 3xl:w-full object-contain max-h-64"
              alt={toy.name!}
            />
          </Link>
          <div className="absolute text-navy-900 dark:text-white top-2 right-2 bg-white dark:bg-navy-700 rounded-full p-2">
            <Link className="text-xl" to={`/toys/${toy.name}/edit`}>
              <MdEditDocument />
            </Link>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <Link
              to={`/toys/${toy.name}`}
              className="text-lg font-bold text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400"
            >
              {toy.name}
            </Link>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {t(`routes.toys.types.${toy.type}.title`)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToyCard;
