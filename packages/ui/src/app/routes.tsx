import { MdDeviceHub, MdHome, MdPeople, MdPlaylistPlay } from 'react-icons/md';

import { RouteNames } from './static';
import MainDashboard from './views/admin/default';
import PlaysView from './views/admin/plays';
import EditPlay from './views/admin/plays/edit';
import NewPlay from './views/admin/plays/new';
import ViewPlay from './views/admin/plays/view';
import SettingsView from './views/admin/settings';
import ToysView from './views/admin/toys';
import EditToy from './views/admin/toys/edit';
import ViewToy from './views/admin/toys/view';
import UsersView from './views/admin/users';
import EditUser from './views/admin/users/edit';
import NewUser from './views/admin/users/new';
import ViewUser from './views/admin/users/view';

export interface RoutesType {
  name: RouteNames;
  layout: string;
  path: string;
  icon?: JSX.Element;
  component: JSX.Element;
  secondary?: string;
  nested?: boolean;
  hidden?: boolean;
}

const routes: RoutesType[] = [
  {
    name: RouteNames.MAIN,
    layout: '/admin',
    path: '/',
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: RouteNames.SETTINGS,
    layout: '/admin',
    path: '/settings',
    component: <SettingsView />,
    hidden: true,
  },
  {
    name: RouteNames.USERS,
    layout: '/admin',
    path: '/users',
    icon: <MdPeople className="h-6 w-6" />,
    component: <UsersView />,
  },
  {
    name: RouteNames.NEW_USER,
    layout: '/admin',
    path: '/users/new',
    component: <NewUser />,
    nested: true,
  },
  {
    name: RouteNames.VIEW_USER,
    layout: '/admin',
    path: '/users/:id',
    component: <ViewUser />,
    nested: true,
  },
  {
    name: RouteNames.EDIT_USER,
    layout: '/admin',
    path: '/users/:id/edit',
    component: <EditUser />,
    nested: true,
  },
  {
    name: RouteNames.TOYS,
    layout: '/admin',
    path: '/toys',
    icon: <MdDeviceHub className="h-6 w-6" />,
    component: <ToysView />,
  },
  {
    name: RouteNames.VIEW_TOY,
    layout: '/admin',
    path: '/toys/:id',
    component: <ViewToy />,
    nested: true,
  },
  {
    name: RouteNames.EDIT_TOY,
    layout: '/admin',
    path: '/toys/:id/edit',
    component: <EditToy />,
    nested: true,
  },
  {
    name: RouteNames.PLAYS,
    layout: '/admin',
    path: '/plays',
    icon: <MdPlaylistPlay className="h-6 w-6" />,
    component: <PlaysView />,
  },
  {
    name: RouteNames.NEW_PLAY,
    layout: '/admin',
    path: '/plays/new',
    component: <NewPlay />,
    nested: true,
  },
  {
    name: RouteNames.VIEW_PLAY,
    layout: '/admin',
    path: '/plays/:id',
    component: <ViewPlay />,
    nested: true,
  },
  {
    name: RouteNames.EDIT_PLAY,
    layout: '/admin',
    path: '/plays/:id/edit',
    component: <EditPlay />,
    nested: true,
  },
];
export default routes;
