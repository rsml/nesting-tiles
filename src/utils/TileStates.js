import * as Utils from './index';

export const states = {
    'INITIAL': 'inital',
    'HOVER': 'hover'
};

const allowedTypes = [null, undefined, ...Utils.objectValues(states)];

export function getAllowedTypes() {
    return allowedTypes;
}
