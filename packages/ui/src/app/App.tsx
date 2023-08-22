import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import GuardedRoute from './GuardedRoute';
import AdminLayout from './layouts/admin';
import AuthLayout from './layouts/auth';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, logout } from './static';

const App = () => {
  const n = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem(
    LOCAL_STORAGE_ACCESS_TOKEN_KEY
  );

  const options = {
    retry: (failureCount, error: any) => {
      if (error.message === 'Unauthorized') {
        return false; // do not retry, trigger error
      }
      // otherwise, restore default
      const defaultRetry =
        new QueryClient().getDefaultOptions().queries?.retry || 0;

      return Number.isSafeInteger(defaultRetry)
        ? failureCount < +defaultRetry
        : false;
    },
    onError: (error: any) => {
      if (error.message === 'Unauthorized') {
        logout();
      } else if (error.message === 'Not Found') {
        n(location.pathname, {
          replace: true,
          state: {
            notFound: true,
          },
        });
      }
    },
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: options,
      mutations: options,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          element={
            <GuardedRoute
              isRouteAccessible={!isAuthenticated}
              redirectRoute={'/'}
            />
          }
        >
          <Route path="/auth/*" element={<AuthLayout />} />
        </Route>
        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isAuthenticated}
              redirectRoute={'/auth/sign-in'}
            />
          }
        >
          <Route path="/*" element={<AdminLayout />} />
          <Route path="/settings/*" element={<AdminLayout />} />
          <Route path="/users/new/*" element={<AdminLayout />} />
          <Route path="/users/:id/edit/*" element={<AdminLayout />} />
          <Route path="/users/:id/*" element={<AdminLayout />} />
          <Route path="/users/*" element={<AdminLayout />} />
          <Route path="/toys/:id/edit/*" element={<AdminLayout />} />
          <Route path="/toys/:id/*" element={<AdminLayout />} />
          <Route path="/toys/*" element={<AdminLayout />} />
          <Route path="/plays/new/*" element={<AdminLayout />} />
          <Route path="/plays/:id/edit/*" element={<AdminLayout />} />
          <Route path="/plays/:id/*" element={<AdminLayout />} />
          <Route path="/plays/*" element={<AdminLayout />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
