import * as Utils from './index';

const types = {
    VIDEO: "video",
    IMAGE: "image",
    WEBSITE: "website"
};
module.exports.types = types;


const allowedTypes = [undefined, null, ...Utils.objectValues(types)];

module.exports.getAllowedTypes = function(){
    return allowedTypes;
};
