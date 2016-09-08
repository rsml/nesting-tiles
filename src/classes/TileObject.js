import { states } from '../utils/TileStates';

class TileObject {
    constructor(id, parentId, children = null, type = null, content = null, size = 50, state = states.INITIAL) {
        this._id = id;
        this._parentId = parentId;
        this._children = children;
        this._type = type;
        this._content = content;
        this._size = size;
        this._state = state;
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

    clone () {
        return new TileObject(this.id, this.parentId, this.children, this.type, this.content, this.size, this.state)
    }
}

export default TileObject;
