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

export function insertToTheRightOf(tileId){
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
    };
}

/***************/

export function setTooltipType(tooltipType){
    return {
        type: ActionTypes.SET_TOOLTIP_TYPE,
        tooltipType
    };
}

export function setTooltipTileId(tooltipTileId){
    return {
        type: ActionTypes.SET_TOOLTIP_TILE_ID,
        tooltipTileId
    };
}

export function setTooltipContent(tooltipContent){
    return {
        type: ActionTypes.SET_TOOLTIP_CONTENT,
        tooltipContent
    };
}

export function setTooltipIsVisible(isVisible){
    return {
        type: ActionTypes.SET_TOOLTIP_IS_VISIBLE,
        isVisible
    };
}

export function submitTooltip(contentType, content){
    return {
        type: ActionTypes.SUBMIT_TOOLTIP,
        contentType,
        content
    };
}

export function updateHoverMenu(options){
    return {
        type: ActionTypes.UPDATE_HOVER_MENU,
        options
    };
}

/***************/

export function handleMouseDownOnDragger(parentId, content){
    return {
        type: ActionTypes.HANDLE_MOUSE_DOWN_ON_DRAGGER,
        parentId,
        content
    };
}

export function handleMouseMoveOnParentContainer(xPos, yPos){
    return {
        type: ActionTypes.HANDLE_MOUSE_MOVE_ON_PARENT_CONTAINER,
        xPos,
        yPos
    };
}

export function handleMouseUpOnParentContainer(){
    return {
        type: ActionTypes.HANDLE_MOUSE_UP_ON_PARENT_CONTAINER
    };
}

/***************/

export function setContextMenuTileId(tileId){
    return {
        type: ActionTypes.SET_CONTEXT_MENU_TILE_ID,
        tileId
    };
}

export function setContextMenuIsRemoveContentEnabled(value){
    return {
        type: ActionTypes.SET_CONTEXT_MENU_IS_REMOVE_CONTENT_ENABLED,
        value
    };
}

export function setContextMenuIsDeleteEnabled(value){
    return {
        type: ActionTypes.SET_CONTEXT_MENU_IS_DELETE_ENABLED,
        value
    };
}

export function setContextMenuPreventEvents(value){
    return {
        type: ActionTypes.SET_CONTEXT_MENU_PREVENT_EVENTS,
        value
    };
}

export function closeContextMenu(){
    return {
        type: ActionTypes.CLOSE_CONTEXT_MENU
    };
}

export function cloneAllTilesAndSwapInNewTile(){
    return {
        type: ActionTypes.CLONE_ALL_TILES_AND_SWAP_IN_NEW_TILE
    };
}
