import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom';

import GuestPageLayout       from 'src/components/layout/GuestPageLayout';
import LoginPage             from 'src/pages/Login';

import urls                  from 'src/urls';


const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route path={urls.index()} element={<GuestPageLayout />}>
      <Route element={<Navigate to={urls.login()} />} index />

      <Route path={urls.login()} element={<LoginPage />} />
    </Route>,

    <Route path="*" element={<Navigate to={urls.index()} replace />} />
  ])
);

const UnauthorizedRoutes = () => <RouterProvider router={routes} />;


export default UnauthorizedRoutes;
