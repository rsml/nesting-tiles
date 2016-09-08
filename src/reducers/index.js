import { combineReducers } from 'redux';
import tiles from './tiles';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  tiles,
  routing: routerReducer
});

export default rootReducer;
