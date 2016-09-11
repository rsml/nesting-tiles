import * as Utils from './index';

export const types = {
    YOUTUBE: 'youtube',
    IMAGE: 'image',
    WEBSITE: 'website'
};


const allowedTypes = [undefined, null, ...Utils.objectValues(types)];

export function getAllowedTypes(){
    return allowedTypes;
}
