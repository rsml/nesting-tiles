import { states } from '../utils/TileStates';

class TileObject {
    constructor(id, parentId, children = null, splitVertical = true, type = null, content = null, size = 50, state = states.INITIAL, percentage = 50) {
        this._id = id;
        this._parentId = parentId;
        this._children = children;
        this._splitVertical = splitVertical;
        this._type = type;
        this._content = content;
        this._size = size;
        this._state = state;
        this._percentage = percentage;
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

    set splitVertical (splitVertical) {
        this._splitVertical = splitVertical;
    }

    get splitVertical () {
        return this._splitVertical;
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

    set percentage (percentage) {
        this._percentage = percentage;
    }

    get percentage () {
        return this._percentage;
    }

    clone () {
        return new TileObject(this.id, this.parentId, this.children, this.splitVertical, this.type, this.content, this.size, this.state, this.percentage)
    }
}

export default TileObject;
