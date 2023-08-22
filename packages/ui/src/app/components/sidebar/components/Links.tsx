import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { RoutesType } from '../../../routes';
import DashIcon from '../../icons/DashIcon';

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const location = useLocation();

  const { t } = useTranslation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return (
      location.pathname === routeName ||
      (routeName != '/' &&
        location.pathname.startsWith(routeName) &&
        !location.state?.notFound)
    );
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        !route.hidden &&
        !route.nested &&
        (route.layout === '/admin' ||
          route.layout === '/auth' ||
          route.layout === '/rtl')
      ) {
        return (
          <Link key={index} to={route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path)
                      ? 'font-bold text-brand-500 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{' '}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path)
                      ? 'font-bold text-navy-700 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {t(`routes.${route.name}.title`)}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
