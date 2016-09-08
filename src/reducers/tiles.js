import * as Utils from '../utils/index';
import * as ActionTypes from '../constants/ActionTypes';
import TileObject from '../classes/TileObject';

const initialState = {
    currentTileId: Utils.ROOT_TILE_ID + 1,
    tiles: {
        [Utils.ROOT_TILE_ID]: new TileObject(Utils.ROOT_TILE_ID)
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
    let newParentTileObject;
    let newChildTileId;
    let newChildTileObject;
    const keys = Object.keys(state.tiles);
    let i;

  switch (action.type) {
    case ActionTypes.INSERT_ABOVE:
        break;

    case ActionTypes.INSERT_BELOW:
        newParentTileId = state.currentTileId;

        newTiles = {};

        for (i = 0; i < keys.length; i++) {
            // newTiles.push(clone state.tiles[i]);
            newTiles[keys[i]] = Object.create(state.tiles[i])

            // ({}, state.tiles[keys[i]]);
            // newTiles.push(Object.assign({}, state.tiles[i]));
        }

        debugger;

        activeTileObject = newTiles[action.tileId];
        if(activeTileObject){
            activeTileObject.parentId = newParentTileId;
        }

        newParentTileObject = new TileObject(newParentTileId, action.tileId);

        newChildTileId = state.currentTileId + 1;
        newChildTileObject = new TileObject(newChildTileId, newParentTileId);
        // debugger;

        newParentTileObject.children = [
            action.tileId,
            newChildTileId
        ];

        newTiles[newParentTileId] = newParentTileObject;
        newTiles[newChildTileId] = newChildTileObject;

        // debugger;

        return Object.assign({}, state, {
            currentTileId: state.currentTileId + 2,
            tiles: newTiles
        });

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
