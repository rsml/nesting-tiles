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
    this.handleDeleteTile = this.handleDeleteTile.bind(this);
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

  handleDeleteTile() {
    this.props.actions.deleteTile(this.props.data.id);
  }

  render() {
    if(!this.props.children || this.props.children.length === 0){
        return (
          <div id={`tile-${this.props.data.id}`}>
          
                ID: {this.props.data.id}
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
                    onClick={this.handleDeleteTile} />
                <img src={require('../images/split-horizontal.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-horizontal'
                    onClick={this.handleSplitHorizontal} />
            </div>
          </div>
        );
    }

    if(this.props.children.length !== 2 || (this.props.data.splitVertical !== true && this.props.data.splitVertical !== false)){
        return (
            <div>
                Improperly formatted tile
            </div>
        );
    }

    if(this.props.data.splitVertical){
        return (
            <div className='Tile-container-full'>
                <div className='Tile-container-top'>
                    {this.props.children[0]}
                </div>
                <div className='Tile-container-bottom'>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }else{
        return (
            <div className='Tile-container-full'>
                <div className='Tile-container-left'>
                    {this.props.children[0]}
                </div>
                <div className='Tile-container-right'>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
  }
}

Tile.propTypes = {
  children: PropTypes.array,
  data: PropTypes.instanceOf(TileObject),
  actions: PropTypes.object.isRequired
};
