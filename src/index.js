require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss';
import './styles/ContextMenu.scss';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
