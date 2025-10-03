import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom';

import ApplicationLayout     from 'src/components/layout/ApplicationLayout';
import GamesListPage         from 'src/pages/GamesList';
import GameDetailsPage       from 'src/pages/GameDetails';

import urls                  from 'src/urls';


const routes = createBrowserRouter(createRoutesFromElements([
  <Route path={urls.index()} element={<ApplicationLayout />}>
    <Route element={<Navigate to={urls.games()} />} index />

    <Route path={urls.games()} element={<GamesListPage />} />
    <Route path={urls.gameDetails(':id')} element={<GameDetailsPage />} />
  </Route>,
  <Route path="*" element={<Navigate to={urls.index()} replace />} />,
]));

const AuthorizedRoutes = () => <RouterProvider router={routes} />;

export default AuthorizedRoutes;
