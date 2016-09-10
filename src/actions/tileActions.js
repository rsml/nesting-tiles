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

export function handleMouseDownOnDragger(parentId){
    return {
        type: ActionTypes.HANDLE_MOUSE_DOWN_ON_DRAGGER,
        parentId
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
