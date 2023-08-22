import { UserGender } from '@xx/models';
import { useTranslation } from 'react-i18next';
import { MdEditDocument } from 'react-icons/md';
import { Link } from 'react-router-dom';

import bannerXX from '../../../../../assets/img/users/banner-xx.png';
import bannerXY from '../../../../../assets/img/users/banner-xy.png';
import Card from '../../../../components/card';
import { User } from '../../../../gql';
import { overallOrgasms, userId } from '../../../../static';

const UserCard = (props: { user: User }) => {
  const { user } = props;
  const currentUserId = userId();

  const { t } = useTranslation();

  return (
    <Card extra={'items-center w-full h-full p-4'}>
      <div
        className="relative flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{
          backgroundImage: `url(${
            user.gender === UserGender.FEMALE ? bannerXX : bannerXY
          })`,
        }}
      >
        {(!currentUserId || currentUserId === user.id) && (
          <div className="absolute text-navy-900 dark:text-white top-2 right-2 bg-white dark:bg-navy-700 rounded-full p-2">
            <Link className="text-xl" to={`/users/${user.username}/edit`}>
              <MdEditDocument />
            </Link>
          </div>
        )}
        <Link
          to={`/users/${user.username}`}
          className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700"
        >
          <img
            className="h-full w-full rounded-full object-cover"
            src={`data:${user.avatar}`}
            alt=""
          />
        </Link>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <Link
          to={`/users/${user.username}`}
          className="text-lg font-bold text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400"
        >
          {user.username}
        </Link>
        <p className="text-base font-normal text-gray-600">
          {user.description}
        </p>
      </div>
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {overallOrgasms(...user.ratings!)}
          </p>
          <p className="text-sm font-normal text-gray-600">
            {t('components.userCard.orgasms')}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {user.ratings!.length}
          </p>
          <p className="text-sm font-normal text-gray-600">
            {t('components.userCard.ratings')}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
