import * as Utils from './index';

const states = {
    INITIAL: "inital",
    HOVER: "hover"
};
module.exports.states = states;


const allowedTypes = [null, undefined, ...Utils.objectValues(states)];

module.exports.getAllowedTypes = function(){
    return allowedTypes;
};
