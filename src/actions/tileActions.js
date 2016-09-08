import dateHelper from '../utils/dateHelper'; // TODO: delete

import * as ActionTypes from '../constants/ActionTypes'

/***************/

export function insertAbove(tileId){
    return {
        type: ActionTypes.INSERT_ABOVE,
        tileId
    };
}

export function insertBelow(tileId){
    return {
        type: ActionTypes.INSERT_BELOW,
        tileId
    };
}

export function insertToTheLeftOf(tileId){
    return {
        type: ActionTypes.INSERT_TO_THE_LEFT_OF,
        tileId
    };
}

export function inesertToTheRightOf(tileId){
    return {
        type: ActionTypes.INSERT_TO_THE_RIGHT_OF,
        tileId
    };
}

/***************/

export function resize(tileId){
    return {
        type: ActionTypes.RESIZE,
        tileId
    };
}

/***************/

export function showInsertMenu(tileId){
    return {
        type: ActionTypes.SHOW_INSERT_MENU,
        tileId
    };
}

export function hideInsertMenu(){
    return {
        type: ActionTypes.HIDE_INSERT_MENU
    };
}

/***************/

export function add(tileId, tileType, content){
    return {
        type: ActionTypes.ADD,
        tileId,
        tileType,
        content
    };
}

/***************/

export function deleteTile(tileId){
    return {
        type: ActionTypes.DELETE_TILE,
        tileId
    }
}



//TODO: delete
// example of a thunk using the redux-thunk middleware
export function saveFuelSavings(settings) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: ActionTypes.SAVE_FUEL_SAVINGS,
      dateModified: dateHelper.getFormattedDateTime(),
      settings
    });
  };
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {
    type: ActionTypes.CALCULATE_FUEL_SAVINGS,
    dateModified: dateHelper.getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}
