import { states } from '../utils/TileStates';

class TileObject {
    constructor(id, parentId) {
        this._id = id;
        this._parentId = parentId;

        this._children = null;
        this._type = null;
        this._content = null;
        this._size = 50;
        this._state = states.INITIAL;
    }

    get id () {
        return this._id;
    }

    set parentId (parentId){
        this._parentId = parentId;
    }

    get parentId(){
        return this._parentId;
    }

    set children(children) {
        this._children = children;
    }

    get children(){
        return this._children;
    }

    set type(type){
        this._type = type;
    }

    get type(){
        return this._type;
    }

    set content (content) {
        this._content = content;
    }

    get content (){
        return this._content;
    }

    set size (size) {
        this._size = size;
    }

    get size (){
        return this._size;
    }

    set state (state) {
        this._state = state;
    }

    get state () {
        return this._state;
    }
}

export default TileObject;
