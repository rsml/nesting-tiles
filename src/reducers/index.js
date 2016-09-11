import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tiles from './tiles';

const rootReducer = combineReducers({
    tiles,
    'routing': routerReducer
});

export default rootReducer;
