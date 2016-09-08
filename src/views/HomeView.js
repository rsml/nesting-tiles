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

    return (
        <div>
          <Tile data={tileObject}
                actions={actions} />
        </div>
    );
  }
}

HomeView.propTypes = {
  tiles: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
