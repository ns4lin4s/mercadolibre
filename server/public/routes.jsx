
import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './views/layout.jsx';
//import DashboardPage from './views/dashboard/index.jsx';
import Error404 from './views/404.jsx';
const loading = () => <div>Cargando...</div>;

const DashboardPage = Loadable({
  loader: () => import('./views/dashboard/index.jsx'),
  loading
});

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={DashboardPage} />
      <Route path='*' component={Error404} />
    </Route>
  </Router>
);
