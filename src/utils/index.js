/*
 * objectValues - polyfill for Object.values()
 */
export function objectValues(obj) {
    return Object.keys(obj)
        .map(key => obj[key]);
}


/*
 * The ID of the first Tile
 * This should be greater than or equal to 0
 */
export const INITIAL_ROOT_TILE_ID = 0;


/**
 * Clones the tile object, but updates the children so that the oldChildId is 
 *     replaced by the newChildID
 * @param  {TileObject} parentTileObject The parent TileObject instance
 * @param  {number} oldChildId The id of the old child tile
 * @param  {number} newChildId The id of the new child tile
 * @return {TileObject} a new tileObject if successful. Otherwise returns the 
 *                         inputted tileObject and fails silently
 */
export function cloneTileAndReplaceChild(parentTileObject,
    oldChildId,
    newChildId) {
    if(!parentTileObject || !parentTileObject.children) {
        return parentTileObject;
    }

    const result = parentTileObject.clone();
    result.children = result.children.map(
        (number) => (number === oldChildId) ?
        newChildId : number
    )

    return result;
}

/**
 * Given a parent TileObject instance, find the
 *     tileId of the sibling of a given childId
 * @param  {TileObject} parentTileObject The parent TileObject instance
 * @param  {number} childId The id of the child tile
 * @return {TileObject} a new tileObject if successful. Otherwise returns the 
 *                         inputted tileObject and fails silently
 */
export function getSiblingId(parentTileObject, childId) {
    if(!parentTileObject || !parentTileObject.children) {
        return null;
    }

    for(let i = 0; i < parentTileObject.children.length; i++) {
        if(parentTileObject.children[i] !== childId) {
            return parentTileObject.children[i];
        }
    }

    return null;
}

/**
 * Checks if a given ancestor DOM node contains
 *     the given child DOM node as a descendant
 * @param  {DOMNode}  ancestorDOMNode The DOM Node of the ancestor element
 * @param  {DOMNode}  descendantDOMNode The DOM Node of the descendant element
 * @return {Boolean} true if the childDOMNode is a descendant, otherwise false
 */
export function isDescendant(ancestorDOMNode, descendantDOMNode) {
    let node = descendantDOMNode.parentNode;
    while(node != null) {
        if(node == ancestorDOMNode) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * Convert 'https://www.youtube.com/watch?v=HxXbrnJ6l4A' into
 *         'https://www.youtube.com/embed/HxXbrnJ6l4A'
 * @param {string} videoURL The url of the youtube video
 * @return {string} Converts a youtube video into an embeddable youtube URL
 */
export function getYoutubeEmbedUrlFromVideoURL(videoURL) {
    const embedUrl = cleanURL(videoURL)
        .replace('/watch?v=', '/embed/');
    const hasArguments = embedUrl.indexOf('?') >= 0;
    const embedUrlWithoutParameters = (hasArguments) ? embedUrl.substring(0,
            embedUrl.indexOf('?')) :
        embedUrl;
    return `${embedUrlWithoutParameters}?autohide=1&autoplay=1&disablekb=0&loop=1&modestbranding=1&playsinline=1&theme=light`;
}

/*
 * Prevent XSS Attacks. This is only essential to have if workspaces are shareable. But it's good to have anyway
 */
export function cleanURL(dirtyURL) {
    if(!dirtyURL) {
        return dirtyURL;
    }

    let result = dirtyURL;
    if(result.indexOf('http://') === -1 &&
        result.indexOf('https://') === -1 &&
        result.indexOf('file://') === -1) {
        result = `http://${result}`;
    }

    return result.replace(/[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]/, '');
}

/**
 * Validate URL
 * @param  {string} dirtyURL The URL to be tested
 * @return {bool}   True if it is a correctly formatted url
 */
export function validateURL(dirtyURL) {
    if(!dirtyURL) {
        return false;
    }

    const cleanedURL = cleanURL(dirtyURL);

    // (This copyright applies to the regex below only)
    //  Copyright (c) 2010-2013 Diego Perini, MIT licensed
    // https://gist.github.com/dperini/729294
    // see also https://mathiasbynens.be/demo/url-regex
    // modified to allow protocol-relative URLs
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        .test(cleanedURL);

}

/**
 * Clones all tiles and returns a new dictionary
 *     mapping tileIds to TileObjects
 * @param  {Object} tiles A mapping of tileIds to TileObjects
 * @return {Object} A new mapping of tileIds to TileObjects
 */
export function cloneAllTiles(tiles) {
    let result = {};

    for(const key of Object.keys(tiles)) {
        const keyAsInt = parseInt(key);
        const oldTile = tiles[keyAsInt];
        result[keyAsInt] = oldTile.clone();
    }

    return result;
}

/**
 * cloneAllTilesAndSwapInNewTile
 *     Clones all the tiles. Meanwhile, looks for any tile matching
 *     'needleTileId' and updates it's clone with a new percentage
 * @param  {Object} tiles         A new mapping of tileIds to TileObjects
 * @param  {number} needleTileId  The id of the tile to edit
 * @param  {number} newPercentage The new percentage of the tile to edit
 * @param  {number} newContent    The new content of the tile to edit
 * @return {Object}               A new mapping of tileIds to tileObjects
 */
export function cloneAllTilesAndSwapInNewTile(tiles,
    needleTileId,
    newPercentage = null,
    newContent = null) {
    const result = {};
    for(const key of Object.keys(tiles)) {
        const keyAsInt = parseInt(key);

        if(keyAsInt === needleTileId) {
            const newTile = tiles[needleTileId].clone();
            if(newPercentage) {
                newTile.percentage = newPercentage;
            }
            if(newContent || newContent === '') {
                newTile.content = newContent;
            }
            result[keyAsInt] = newTile;
        } else {
            result[keyAsInt] = tiles[keyAsInt].clone();
        }
    }
    return result;
}

/**
 * Bubble through the DOM, search for a Tile object.
 *     Then return the id of the first tile you find. Otherwise return -1
 * @param  {DOMNode} target given an contextmenu event object,
 *                          this is event.target
 * @return {number} A tileId, or -1 if none are found
 */
export function findIdOfTileThatClickIsInsideOf(target) {
    let currentTarget = target;
    do {
        if(currentTarget.classList.contains('Tile')) {
            return parseInt(currentTarget.dataset.id);
        }

        currentTarget = currentTarget.parentElement;
    } while (currentTarget);
    return null;
}
