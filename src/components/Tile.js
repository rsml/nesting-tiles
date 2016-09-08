import React, { Component, PropTypes } from 'react';
import TileObject from '../classes/TileObject';
// import TileStates from '../utils/TileStates';
// import TileTypes from '../utils/TileTypes';
import './Tile.css';

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleShowInsertMenu = this.handleShowInsertMenu.bind(this);
    this.handleSplitVertical = this.handleSplitVertical.bind(this);
    this.handleSplitHorizontal = this.handleSplitHorizontal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleShowInsertMenu() {
    this.props.actions.showInsertMenu(this.props.data.id);
  }

  handleSplitVertical() {
    this.props.actions.insertBelow(this.props.data.id);
  }

  handleSplitHorizontal() {
    this.props.actions.inesertToTheRightOf(this.props.data.id);
  }

  handleDelete() {
    this.props.actions.delete(this.props.data.id);
  }

  render() {
    if(!this.props.children){
        return (
          <div id={`tile-${this.props.data.id}`}>
            <div className='Tile-menu'>
                <img src={require('../images/insert.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-insert'
                    onClick={this.handleShowInsertMenu} />
                <img src={require('../images/split-vertical.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-vertical'
                    onClick={this.handleSplitVertical} />
                <img src={require('../images/delete.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-delete'
                    onClick={this.handleDelete} />
                <img src={require('../images/split-horizontal.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-horizontal'
                    onClick={this.handleSplitHorizontal} />
            </div>
          </div>
        );
    }

    const tileObjects = this.props.children.map((tileObject) => (<Tile data={tileObject} />))
    return (
        <div>
            {tileObjects}
        </div>
    );
  }
}

Tile.propTypes = {
  data: PropTypes.instanceOf(TileObject),
  actions: PropTypes.object.isRequired
};
