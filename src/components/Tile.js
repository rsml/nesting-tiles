import React, { Component, PropTypes } from 'react';
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
    this.props.actions.showInsertMenu(this.props.id);
  }

  handleSplitVertical() {
    this.props.actions.insertBelow(this.props.id);
  }

  handleSplitHorizontal() {
    this.props.actions.inesertToTheRightOf(this.props.id);
  }

  handleDelete() {
    this.props.actions.delete(this.props.id);
  }

  render() {
    return (
      <div id={`tile-${this.props.id}`}>
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
}

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  /*type: PropTypes.oneOf(TileTypes.getAllowedTypes()),*/
  type: PropTypes.string,
  content: PropTypes.string,
  size: PropTypes.number,
  state: PropTypes.string,
  /*state: PropTypes.oneOf(TileStates.getAllowedTypes()),*/
  actions: PropTypes.object.isRequired
};
