import React, { Component, PropTypes } from 'react';
import Tile from '../components/Tile';

export default class HomeView extends Component {
    _getChildren(tileId) {
        const {
            tiles,
            actions
        } = this.props;

        const tileObject = tiles[tileId];
        const that = this;

        let result = [];

        const children = tileObject.children || [];
        for (let i = 0; i < children.length; i++) {
            const childId = tileObject.children[i];
            const childObject = tiles[childId];

            result.push((
                <Tile key={childId}
                      data={childObject}
                      actions={actions}>
                    {that._getChildren(childId)}
                </Tile>
            ))
        }

        return result;
    }


  render() {
    const {
        rootTileId,
        tiles,
        actions
    } = this.props;

    const tileObject = tiles[rootTileId];

    if(!tileObject){
        return (
            <div>
              No Tile Found
            </div>
        );
    }

    const that = this;
    const children = that._getChildren(tileObject.id);
    let allTiles = (
        <Tile key={tileObject.id} 
              data={tileObject}
              actions={actions}>
            {children}
        </Tile>
    );

/*
    if(tileObject.children){
        allTiles.props.children = 
    }
*/





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
