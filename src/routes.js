import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default

export default (
  <Route path='/' component={App}>
    <IndexRoute component={FuelSavingsPage}/>
    <Route path='*' component={FuelSavingsPage}/>
  </Route>
);
