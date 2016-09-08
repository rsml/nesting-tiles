import React, { Component, PropTypes } from 'react';
import Tile from '../components/Tile';
import * as Utils from '../utils/index';

export default class HomeView extends Component {
  render() {
    const {
        /*store,
        history,
        dispatch,*/
        tiles,
        actions
    } = this.props;

    const tileObject = tiles[Utils.ROOT_TILE_ID];

    if(!tileObject){
        return (
            <div>
              No Tile Found
            </div>
        );
    }

    let allTiles = (
        <Tile data={tileObject}
                actions={actions} />
    );

    debugger;
    if(tileObject.children){
        debugger;
        // allTiles
    }






    return (
        <div>
          {allTiles}
        </div>
    );
  }
}

HomeView.propTypes = {
  rootTileId: PropTypes.number.isRequired,
  tiles: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
