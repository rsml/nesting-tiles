import * as Utils from '../utils/index';
import * as ActionTypes from '../constants/ActionTypes';
import TileObject from '../classes/TileObject';
import * as TileTypes from '../utils/TileTypes';
import Directions from '../utils/Directions';

const initialState = {
    rootTileId: Utils.INITIAL_ROOT_TILE_ID,
    currentTileId: Utils.INITIAL_ROOT_TILE_ID + 1,
    tiles: {
        [Utils.INITIAL_ROOT_TILE_ID]: new TileObject(Utils.INITIAL_ROOT_TILE_ID)
    },
    tooltip: {
        tileId: null,
        type: TileTypes.types.YOUTUBE,
        content: null,
        isVisible: false
    },
    hoverMenu: {
        isVisible: false,
        tileId: null
    },

    /* This is used for resizable panes */
    dragger: {
        isVertical: null,
        parentId: null,
        xPos: null,
        yPos: null,
        isResizing: false,
        containerWidth: null,
        containerHeight: null,
        containerOffsetTop: null,
        containerOffsetLeft: null
    },
    contextMenu: {
        tileId: null,
        isRemoveContentEnabled: false,
        isDeleteEnabled: false,
        preventEvents: false
    },
    tileIdBeingDeleted: -1
};

function updateHoverMenuWithSibling(state, options){
    if(state.tooltip.isVisible){
        return state;
    }

    const parentTileObject = state.tiles[options.parentId];

    return Object.assign({}, state, {
        hoverMenu: Object.assign({}, state.hoverMenu, {
            isVisible: options.isVisible,
            tileId: Utils.getSiblingId(parentTileObject, options.childId)
        })
    });
}

function handleMouseDownOnDragger(state, parentId, content){
    const parentTile = document.getElementById(`tile-${parentId}-${content}`);
    const isVertical = state.tiles[parentId].splitVertical;
    const bounds = parentTile.getBoundingClientRect();
    return Object.assign({}, state, {
        dragger: Object.assign({}, state.dragger, {
            isVertical: isVertical,
            parentId: parentId,
            isResizing: true,
            containerWidth: bounds.width,
            containerHeight: bounds.height,
            containerOffsetLeft: bounds.left,
            containerOffsetTop: bounds.top
        })
    });
}

function handleMouseMoveOnParentContainer(state, xPos, yPos){
    if(!state.dragger.isResizing){
        return state;
    }

    // console.log('DEBUG isResizing: ' + state.dragger.isResizing);

    if(state.dragger.isVertical){
        // const offsetRight = state.dragger.containerWidth - action.xPos;
        // TODO!!!
        
        // left.css('right', offsetRight);
        // right.css('width', offsetRight);
        // 
        // 
        const widthPercentage = (xPos - state.dragger.containerOffsetLeft)/state.dragger.containerWidth * 100;
        // console.log('DEBUG heightPercentage: ' + JSON.stringify(heightPercentage))
        
        return Object.assign({}, state, {
            tiles: Utils.cloneAllTilesAndSwapInNewTile(state.tiles,
                                                       state.dragger.parentId,
                                                       widthPercentage,
                                                       null),
            dragger: Object.assign({}, state.dragger, {
                xPos: xPos,
                yPos: yPos
            })
        });
    }else{ 
        // const offsetBottom = state.dragger.containerHeight - state.dragger.containerOffsetTop;
        // TODO!!!
        
        // left.css('bottom', offsetRight);
        // right.css('height', offsetRight);
        // 
        // 
        const heightPercentage =  (yPos - state.dragger.containerOffsetTop)/state.dragger.containerHeight * 100;
        console.log('DEBUG heightPercentage: ' + JSON.stringify(heightPercentage))

        return Object.assign({}, state, {
            tiles: Utils.cloneAllTilesAndSwapInNewTile(state.tiles,
                                                       state.dragger.parentId,
                                                       heightPercentage,
                                                       null),
            dragger: Object.assign({}, state.dragger, {
                xPos: xPos,
                yPos: yPos
            })
        });
    }
}

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
    const splitVertical = (direction === Directions.LEFT ||
                           direction === Directions.RIGHT);

    let newChildrenTiles;
    if(direction === Directions.LEFT || direction === Directions.ABOVE){
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
        tiles: newTiles,
        tooltip: Object.assign({}, state.tooltip, {
            isVisible: false
        })
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
        tiles: newTiles,
        tooltip: Object.assign({}, state.tooltip, {
            isVisible: false
        }),
        tileIdBeingDeleted: activeTileId
    });
}

function submitTooltip(state, type, content){
    // efficiently copy over all of the TileObjects to a new dictionary
    // but if the find the one TileObject that should be updated, clone it
    // and update it
    let newTiles = {};
    for (let key in state.tiles) {
        if(parseInt(key) === state.tooltip.tileId){
            let newTileObject = state.tiles[key].clone();
            newTileObject.type = type;
            newTileObject.content = content;
            newTiles[key] = newTileObject
        }else{
            newTiles[key] = state.tiles[key];
        }
    }

    return Object.assign({}, state, {
        tiles: newTiles,
        tooltip: Object.assign({}, state.tooltip, {
            tileId: null,
            type: null,
            content: null,
            isVisible: false
        })
    });
}

export default function tiles(state = initialState, action) {
    // If the context menu is visible, it
    // should block all other reducer functions
    if(state.contextMenu.preventEvents && 
        action.type !== ActionTypes.SET_CONTEXT_MENU_PREVENT_EVENTS && 
        action.type !== ActionTypes.UPDATE_HOVER_MENU_WITH_SIBLING &&
        action.type !== ActionTypes.CLOSE_CONTEXT_MENU){
        return state;
    }

  switch (action.type) {
    case ActionTypes.INSERT_ABOVE:
        return insertInDirection(state, Directions.ABOVE, action.tileId);

    case ActionTypes.INSERT_BELOW:
        return insertInDirection(state, Directions.BELOW, action.tileId);

    case ActionTypes.INSERT_TO_THE_LEFT_OF:
        return insertInDirection(state, Directions.LEFT, action.tileId);

    case ActionTypes.INSERT_TO_THE_RIGHT_OF:
        return insertInDirection(state, Directions.RIGHT, action.tileId);

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

    case ActionTypes.SET_TOOLTIP_IS_VISIBLE:
        return Object.assign({}, state, {
            tooltip: Object.assign({}, state.tooltip, {
                isVisible: action.isVisible
            })
        });

    case ActionTypes.SUBMIT_TOOLTIP:
        document.body.click();
        return submitTooltip(state, action.contentType, action.content);

    case ActionTypes.UPDATE_HOVER_MENU:
        if(action.options.tileId === state.tileIdBeingDeleted){
            return state;
        }

        if(state.tooltip.isVisible){
            return state;
        }

        return Object.assign({}, state, {
            hoverMenu: Object.assign({}, state.hoverMenu, {
                isVisible: action.options.isVisible,
                tileId: action.options.tileId
            })
        });

    case ActionTypes.UPDATE_HOVER_MENU_WITH_SIBLING:
        return updateHoverMenuWithSibling(state, action.options);

    case ActionTypes.HANDLE_MOUSE_DOWN_ON_DRAGGER:
        return handleMouseDownOnDragger(state, action.parentId, action.content);

    case ActionTypes.HANDLE_MOUSE_MOVE_ON_PARENT_CONTAINER:
        return handleMouseMoveOnParentContainer(state, action.xPos, action.yPos);

    case ActionTypes.HANDLE_MOUSE_UP_ON_PARENT_CONTAINER:
        return Object.assign({}, state, {
            dragger: Object.assign({}, state.dragger, {
                isResizing: false
            })
        });

    case ActionTypes.SET_CONTEXT_MENU_TILE_ID:
        return Object.assign({}, state, {
            contextMenu: Object.assign({}, state.contextMenu, {
                tileId: action.tileId,
                preventEvents: (action.tileId !== null) ? true : false
            })
        });

    case ActionTypes.SET_CONTEXT_MENU_IS_REMOVE_CONTENT_ENABLED:
        return Object.assign({}, state, {
            contextMenu: Object.assign({}, state.contextMenu, {
                isRemoveContentEnabled: action.value
            })
        });

    case ActionTypes.SET_CONTEXT_MENU_IS_DELETE_ENABLED:
        return Object.assign({}, state, {
            contextMenu: Object.assign({}, state.contextMenu, {
                isDeleteEnabled: action.value
            })
        });

    case ActionTypes.SET_CONTEXT_MENU_PREVENT_EVENTS:
        return Object.assign({}, state, {
            contextMenu: Object.assign({}, state.contextMenu, {
                preventEvents: action.value
            })
        });

    case ActionTypes.CLOSE_CONTEXT_MENU:
        document.getElementById('contextMenu').style.cssText = 'visibility: hidden;';

        return Object.assign({}, state, {
            contextMenu: Object.assign({}, state.contextMenu, {
                tileId: null
            })
        });

    case ActionTypes.CLONE_ALL_TILES_AND_SWAP_IN_NEW_TILE:
        return Object.assign({}, state, {
            tiles: Utils.cloneAllTilesAndSwapInNewTile(state.tiles, state.hoverMenu.tileId, null, '')
        });

    default:
      return state;
  }
}
