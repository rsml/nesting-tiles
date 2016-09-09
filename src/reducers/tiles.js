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
    },
    tooltip: {
        tileId: null,
        type: null,
        content: null
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

    // Create the new parent tile and the new sibling tile,
    // and add both these tiles to the cloned tiles
    const splitVertical = (direction === DIRECTIONS.ABOVE ||
                           direction === DIRECTIONS.BELOW);

    let newChildrenTiles;
    if(direction === DIRECTIONS.LEFT || direction === DIRECTIONS.ABOVE){
        newChildrenTiles = [newSiblingTileId, activeTileId]
    }else{
        newChildrenTiles = [activeTileId, newSiblingTileId];
    }

    const newParentTileObject = new TileObject(
        newParentTileId,
        oldParentTileId,
        newChildrenTiles,
        splitVertical
    );
    const newSiblingTileObject = new TileObject(
        newSiblingTileId,
        newParentTileId
    );

    newTiles[newParentTileId] = newParentTileObject;
    newTiles[newSiblingTileId] = newSiblingTileObject;

    if(oldParentTileId >= 0){
        newTiles[oldParentTileId] = Utils.updateTileWithChildren(
            newTiles[oldParentTileId],
            activeTileId,
            newParentTileId
        );
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

/**
 * Steps:
 *  - get the active tile
 *  - get the parent tile. if it doesn't exist, then return the state unchanged
 *  - get the sibling of the active tile
 *  - update the parentId of the sibling tile
 *  - update the children of the grandparent tile
 *  - remove the parent and active tile from the tiles data structure
 *  - if the old parent tile was the rootTileId, then set the rootTileId to be
 *      the sibling tile's id
 */
function deleteTile(state, activeTileId){
    const tiles = state.tiles;

    // get the active tile
    const activeTileObject = tiles[activeTileId];

    // get the parent tile. if it doesn't exist, then return the state unchanged
    if(typeof activeTileObject.parentId === 'undefined'){
        // Unable to delete the root tag
        return state;
    }
    const parentTileObject = tiles[activeTileObject.parentId];

    // get the sibling of the active tile
    let siblingTileId = Utils.getSiblingId(parentTileObject, activeTileId);

    // update the parentId of the sibling tile
    const siblingTileObject = tiles[siblingTileId];
    if(!siblingTileObject){
        return state;
    }
    const newSiblingTileObject = siblingTileObject.clone();
    newSiblingTileObject.parentId = parentTileObject.parentId;

    // update the children of the grandparent tile
    const grandParentTileId = parentTileObject.parentId;
    const grandParentTileObject = tiles[grandParentTileId];
    let newGrandparentTileObject;
    if(grandParentTileObject){
        newGrandparentTileObject = grandParentTileObject.clone();
        newGrandparentTileObject.children =
            newGrandparentTileObject.children.map(
            (child) => (child === parentTileObject.id) ? siblingTileId : child
        );
    }

    // remove the parent and active tile from the tiles data structure
    // copy of the tiles to a new dictionary and omit the active tile and parent
    const newTiles = {};
    const tilesKeys = Object.keys(tiles);
    for (let i = 0; i < tilesKeys.length; i++) {
        const key = parseInt(tilesKeys[i]);
        if(key === activeTileId || key === activeTileObject.parentId){
            continue;
        }

        if(key === grandParentTileId){
            newTiles[key] = newGrandparentTileObject;
            continue;
        }

        if(key === siblingTileId){
            newTiles[key] = newSiblingTileObject;
            continue;
        }

        newTiles[key] = tiles[key];
    }

    /* if the old parent tile was the rootTileId, then set the rootTileId to be
       the sibling tile's id */
    let newRootTileId = (
        state.rootTileId === activeTileObject.parentId
    ) ? siblingTileId : state.rootTileId;

    return Object.assign({}, state, {
        rootTileId: newRootTileId,
        tiles: newTiles
    });
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
        return deleteTile(state, action.tileId);

    case ActionTypes.SET_TOOLTIP_TYPE:
        return Object.assign({}, state, {
            tooltip: Object.assign({}, state.tooltip, {
                type: action.tooltipType
            })
        });

    case ActionTypes.SET_TOOLTIP_TILE_ID:
        return Object.assign({}, state, {
            tooltip: Object.assign({}, state.tooltip, {
                tileId: action.tooltipTileId
            })
        });

    case ActionTypes.SET_TOOLTIP_CONTENT:
        return Object.assign({}, state, {
            tooltip: Object.assign({}, state.tooltip, {
                content: action.tooltipContent
            })
        });



    default:
      return state;
  }
}
