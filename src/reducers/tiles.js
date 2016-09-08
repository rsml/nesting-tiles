import * as Utils from '../utils/index';
import * as ActionTypes from '../constants/ActionTypes';
import TileObject from '../classes/TileObject';

const initialState = {
    rootTileId: Utils.INITIAL_ROOT_TILE_ID,
    currentTileId: Utils.INITIAL_ROOT_TILE_ID + 1,
    tiles: {
        [Utils.INITIAL_ROOT_TILE_ID]: new TileObject(Utils.INITIAL_ROOT_TILE_ID)
    },
    insertMenu: {
        isVisible: false,
        tileId: null
    }
};

export default function tiles(state = initialState, action) {
    let newParentTileId;
    let newTiles;
    let activeTileObject;
    let newChildTileId;
    let newChildTileObject;
    let newParentTileObject;
    const keys = Object.keys(state.tiles);
    let i;
    let newParameters;

  switch (action.type) {
    case ActionTypes.INSERT_ABOVE:
        break;

    case ActionTypes.INSERT_BELOW:

        newTiles = {};

        for (i = 0; i < keys.length; i++) {
            // newTiles.push(clone state.tiles[i]);
            newTiles[keys[i]] = state.tiles[i].clone();

            // ({}, state.tiles[keys[i]]);
            // newTiles.push(Object.assign({}, state.tiles[i]));
        }

        activeTileObject = newTiles[action.tileId];
        if(activeTileObject){
            activeTileObject.parentId = newParentTileId;
        }

        newParentTileId = state.currentTileId;
        newChildTileId = state.currentTileId + 1;
        newChildTileObject = new TileObject(newChildTileId, newParentTileId);
        newParentTileObject = new TileObject(newParentTileId, action.tileId, [action.tileId, newChildTileId]); // debugger;

        newTiles[newParentTileId] = newParentTileObject;
        newTiles[newChildTileId] = newChildTileObject;

        newParameters = {
            currentTileId: state.currentTileId + 2,
            tiles: newTiles
        };

        if(action.tileId === state.rootTileId){ // TODO!!!
            newParameters.rootTileId = newParentTileId;
        }

        return Object.assign({}, state, newParameters);

    case ActionTypes.INSERT_TO_THE_LEFT_OF:
        break;

    case ActionTypes.INSERT_TO_THE_RIGHT_OF:
        break;


    case ActionTypes.RESIZE:
        break;


    case ActionTypes.SHOW_INSERT_MENU:
        break;

    case ActionTypes.HIDE_INSERT_MENU:
        break;


    case ActionTypes.ADD:
        break;


    case ActionTypes.DELETE_TILE:
        break;


    default:
      return state;
  }
}


/*import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/ActionTypes';
import calculator from '../utils/fuelSavingsCalculator';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function fuelSavingsReducer(state = initialState.fuelSavings, action) {
  let newState;

  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in tileActions.js
      return objectAssign({}, state, {dateModified: action.dateModified});

    case CALCULATE_FUEL_SAVINGS:
      newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateSavings = calculator().necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = action.dateModified;

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calculator().calculateSavings(newState);
      }

      return newState;

    default:
      return state;
  }
}
*/
