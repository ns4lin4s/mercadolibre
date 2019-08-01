
import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './views/layout.jsx';
import Error404 from './views/404.jsx';
const loading = () => <div>Cargando...</div>;

const DashboardPage = Loadable({
  loader: () => import('./views/home/index.jsx'),
  loading
});

const DetailPage = Loadable({
  loader: () => import('./views/detail/index.jsx'),
  loading
});

const ResultPage = Loadable({
  loader: () => import('./views/result/index.jsx'),
  loading
});

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={DashboardPage} />
      <Route path="/resultados(?q=:query)" component={ResultPage}></Route>
      <Route exact path="/detalle/:id" component={DetailPage}></Route>
      <Route path='*' component={Error404} />
    </Route>
  </Router>
);
