const objectValues = function(obj){
    return Object.keys(obj).map(key => obj[key]);
};
export { objectValues };

export const INITIAL_ROOT_TILE_ID = 0;

export function cloneAllTiles(tiles){
    let result = {};
    
    for (const key of Object.keys(tiles)) {
        result[key] = tiles[key].clone();
    }

    return result;
}

// Update the children for the old parent tile object to point to the new parent tile object
export function updateTileWithChildren(tileObject, oldChildId, newChildId){
    if(!tileObject || !tileObject.children){
        return tileObject;
    }

    const result = tileObject.clone();
    result.children = result.children.map(
        (number) => (number === oldChildId) ? newChildId : number
    )

    return result;
}

export function getSiblingId(parentTileObject, childId){
    if(!parentTileObject || !parentTileObject.children){
        return null;
    }

    for (let i = 0; i < parentTileObject.children.length; i++) {
        if(parentTileObject.children[i] !== childId){
            return parentTileObject.children[i];
        }
    }

    return null;
}
