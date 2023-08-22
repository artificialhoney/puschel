import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CgChevronLeft } from 'react-icons/cg';
import { MdGroupAdd, MdOutlineStopCircle, MdPlaylistAdd } from 'react-icons/md';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { Link, matchPath, useParams } from 'react-router-dom';

import adminImage from '../../../assets/img/avatars/admin.png';
import {
  useFindActivePlayQuery,
  useFindCurrentUserQuery,
  useStopPlayMutation,
} from '../../gql';
import routes from '../../routes';
import {
  dataSource,
  logout,
  RouteNames,
  switchDarkMode,
  userId,
} from '../../static';
import Dropdown from '../dropdown';

const Navbar = (props: {
  onOpenSidenav: () => void;
  route: string;
  secondary?: boolean | string;
  notFound?: boolean;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { onOpenSidenav, route, notFound } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark')
  );

  const user = !!userId();
  const userQuery = useFindCurrentUserQuery(
    dataSource(),
    {},
    { enabled: user }
  );
  const playQuery = useFindActivePlayQuery(dataSource(), undefined, {
    refetchInterval: 1000,
  });
  const stopMutation = useStopPlayMutation(dataSource());

  const stop = () => {
    stopMutation.mutate(
      { id: playQuery!.data!.findActivePlay!.id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries();
        },
      }
    );
  };

  const { t } = useTranslation();

  const activeRoutes = routes.filter(
    (r) =>
      (route === 'main' && r.name === RouteNames.MAIN) ||
      (!route.endsWith('new') && matchPath(r.path, route)) ||
      (r.path !== '/' && route.startsWith(r.path))
  );

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 py-2 p-2.5 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div>
        <div className="h-6 w-[224px] pt-1">
          <Link
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="/"
          >
            {t('components.navbar.pages')}
          </Link>
          {[
            ...(notFound ? [{ name: 'notFound', path: '#' }] : activeRoutes),
          ].map((r, i) => {
            return (
              <span key={i}>
                <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                  {' '}
                  /{' '}
                </span>
                <Link
                  className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                  to={i === activeRoutes.length - 1 ? route : r.path}
                >
                  {t(`routes.${r.name}.breadcrumb`, params)}
                </Link>
              </span>
            );
          })}
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {notFound
              ? t('routes.notFound.title')
              : t(
                  `routes.${activeRoutes[activeRoutes.length - 1].name}.title`,
                  params
                )}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-between gap-2 rounded-3xl bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <CgChevronLeft />
        </span>

        <div className="flex items-center justify-end gap-3 flex-end w-full">
          {playQuery?.data?.findActivePlay && (
            <div className="flex-1 flex flex-grow text-gray-600 dark:text-white justify-center items-center truncate">
              <Link to={`/plays/${playQuery!.data!.findActivePlay!.name}`}>
                {playQuery!.data!.findActivePlay!.name}
              </Link>
              <span className="relative flex h-3 w-3 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 dark:bg-brand-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500 dark:bg-brand-400"></span>
              </span>
            </div>
          )}
          {playQuery?.data?.findActivePlay && (
            <button
              className="text-xl text-gray-600 dark:text-white"
              onClick={stop}
            >
              <MdOutlineStopCircle />
            </button>
          )}
          <Link
            className="text-xl text-gray-600 dark:text-white"
            to="/users/new"
          >
            <MdGroupAdd />
          </Link>
          <Link
            className="text-2xl text-gray-600 dark:text-white"
            to="/plays/new"
          >
            <MdPlaylistAdd />
          </Link>
          <button
            className="text-gray-600"
            onClick={() => {
              setDarkmode(switchDarkMode(!darkmode));
            }}
          >
            {darkmode ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </button>
          <Dropdown
            button={
              user ? (
                <img
                  className="h-10 w-10 rounded-full cursor-pointer object-cover"
                  src={
                    userQuery!.data?.findUser?.avatar
                      ? `data:${
                          userQuery!.data?.findUser &&
                          userQuery!.data!.findUser!.avatar
                        }`
                      : ''
                  }
                />
              ) : (
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={adminImage}
                />
              )
            }
            children={
              <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="mt-3 ml-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      Hola,{' '}
                      {userQuery?.data?.findUser?.username ||
                        t('components.navbar.admin')}
                    </p>{' '}
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                {
                  <div className="mt-3 ml-4 flex flex-col">
                    <Link
                      to={user ? '/users/me/edit' : '/settings'}
                      className="cursor-pointer mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                    >
                      {t('components.navbar.settings')}
                    </Link>
                  </div>
                }

                <div className="mt-3 ml-4 flex flex-col">
                  <p
                    onClick={logout}
                    className="cursor-pointer mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    {t('components.navbar.logout')}
                  </p>
                </div>
              </div>
            }
            classNames={'py-2 top-8 -left-[180px] w-max'}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
