const objectValues = function(obj){
    return Object.keys(obj).map(key => obj[key]);
};
export { objectValues };

export const INITIAL_ROOT_TILE_ID = 0;

export function cloneAllTiles(tiles){
    var result = {};
    const keys = Object.keys(tiles);

    for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = tiles[i].clone();
    }

    return result;
}

// Update the children for the old parent tile object to point to the new parent tile object
export function updateTileWithChildren(tileObject, oldChildId, newChildId){
    if(!tileObject || !tileObject.children){
        return tileObject;
    }

    debugger;

    const result = tileObject.clone();
    result.children = result.children.map(
        (number) => (number === oldChildId) ? newChildId : number
    )

    return result;
}
