import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
  isRouteAccessible?: boolean;
  redirectRoute?: string;
}

const GuardedRoute = ({
  isRouteAccessible = false,
  redirectRoute = '/',
}: GuardedRouteProps): JSX.Element =>
  isRouteAccessible ? <Outlet /> : <Navigate to={redirectRoute} replace />;

export default GuardedRoute;
