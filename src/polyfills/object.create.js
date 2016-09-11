/* eslint new-cap: 0 */

//  Copyright (c) 2010-2013 lavoiesl (htts://github.com/lavoiesl)
// https://gist.githubusercontent.com/lavoiesl/6642066/raw/1908595416c8b9c4156c7bac465d1e11011d60a5/object.create.js

if(typeof Object.create !== 'function') {
    (function () {
        let ObjectClass = function () {};
        Object.create = function (o) {
            if(arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if(o === null) {
                throw Error('Cannot set a null [[Prototype]]');
            }
            if(typeof o !== 'object') {
                throw TypeError('Argument must be an object');
            }
            ObjectClass.prototype = o;
            return new ObjectClass();
        };
    }());
}
