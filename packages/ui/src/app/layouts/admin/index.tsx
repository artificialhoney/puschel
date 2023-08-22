import React from 'react';
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import routes, { RoutesType } from '../../routes';
import { RouteNames } from '../../static';
import NotFoundView from '../../views/admin/not-found';

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState('/');

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    const activeRoute = RouteNames.MAIN;
    for (let i = 0; i < routes.length; i++) {
      if (matchPath(routes[i].path, location.pathname)) {
        setCurrentRoute(location.pathname);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (matchPath(routes[i].path, location.pathname)) {
        return routes[i].secondary!;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return [
      ...routes
        .filter((prop) => {
          return (
            prop.layout === '/admin' &&
            matchPath(prop.path, location.pathname) &&
            !location.state?.notFound
          );
        })
        .map((prop, key) => (
          <Route path="/" element={prop.component} key={key} />
        )),
      <Route path="/*" element={<NotFoundView />} key={-1} />,
    ];
  };

  const activeRoutes = getRoutes(routes);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              route={currentRoute}
              secondary={getActiveNavbar(routes)}
              notFound={activeRoutes.length === 1}
              {...rest}
            />
            <div className="pt-8 mx-auto mb-auto h-full min-h-[84vh] p-3">
              <Routes>{activeRoutes}</Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
