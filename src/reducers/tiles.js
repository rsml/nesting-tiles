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

const DIRECTIONS = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    LEFT: 'LEFT',
    RIGHT:  'RIGHT'
};

function insertInDirection(state, direction, activeTileId){
    let newTiles = Utils.cloneAllTiles(state.tiles);

    // Set the ids for the new tiles
    const newParentTileId = state.currentTileId;
    const newSiblingTileId = state.currentTileId + 1;

    // Get the active tile object and safely exit if there is an error
    const activeTileObject = newTiles[activeTileId];
    if(!activeTileObject){
        return state;
    }

    // Keep track of the old parentId for the active tile
    const oldParentTileId = activeTileObject.parentId;
    
    // Update the parentId for the activeTile
    activeTileObject.parentId = newParentTileId;

    // Create the new parent tile and the new sibling tile, and add both these tiles to the cloned tiles
    const splitVertical = (direction === DIRECTIONS.ABOVE || direction === DIRECTIONS.BELOW);

    let newChildrenTiles;
    if(direction === DIRECTIONS.LEFT || direction === DIRECTIONS.ABOVE){
        newChildrenTiles = [newSiblingTileId, activeTileId]
    }else{
        newChildrenTiles = [activeTileId, newSiblingTileId];
    }

    const newParentTileObject = new TileObject(newParentTileId, oldParentTileId, newChildrenTiles, splitVertical);
    const newSiblingTileObject = new TileObject(newSiblingTileId, newParentTileId);

    newTiles[newParentTileId] = newParentTileObject;
    newTiles[newSiblingTileId] = newSiblingTileObject;

    if(oldParentTileId >= 0){
        newTiles[oldParentTileId] = Utils.updateTileWithChildren(newTiles[oldParentTileId], activeTileId, newParentTileId);
    }

    let newParameters = {
        currentTileId: state.currentTileId + 2,
        tiles: newTiles
    };

    if(activeTileId === state.rootTileId){
        newParameters.rootTileId = newParentTileId;
    }

    return Object.assign({}, state, newParameters);
}

export default function tiles(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.INSERT_ABOVE:
        return insertInDirection(state, DIRECTIONS.ABOVE, action.tileId);

    case ActionTypes.INSERT_BELOW:
        return insertInDirection(state, DIRECTIONS.BELOW, action.tileId);

    case ActionTypes.INSERT_TO_THE_LEFT_OF:
        return insertInDirection(state, DIRECTIONS.LEFT, action.tileId);

    case ActionTypes.INSERT_TO_THE_RIGHT_OF:
        return insertInDirection(state, DIRECTIONS.RIGHT, action.tileId);


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
