// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { applyMiddleware, compose, createStore } from 'redux';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    const middewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate
        // your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to
        // each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunkMiddleware,
        createLogger()
    ];

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middewares),
        DevTools.instrument(),
        window.devToolsExtension ?
            window.devToolsExtension() :
            f => f // add support for Redux dev tools
    ));

    if(module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
