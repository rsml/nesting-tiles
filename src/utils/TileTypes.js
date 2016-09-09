import * as Utils from './index';

export const types = {
    VIDEO: "video",
    IMAGE: "image",
    WEBSITE: "website"
};


const allowedTypes = [undefined, null, ...Utils.objectValues(types)];

export function getAllowedTypes(){
    return allowedTypes;
}
