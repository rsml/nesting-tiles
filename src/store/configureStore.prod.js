import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    const middewares = [
        thunkMiddleware
    ];

    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middewares)
    ));
}
