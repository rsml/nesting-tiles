import React, { Component, PropTypes } from 'react';
import Tile from '../components/Tile';

export default class HomeView extends Component {
    _getChildren(tileId) {
        const {
            tiles,
            tooltip,
            actions
        } = this.props;

        const tileObject = tiles[tileId];
        const that = this;

        let result = [];

        const children = tileObject.children || [];
        for (let i = 0; i < children.length; i++) {
            const childId = tileObject.children[i];
            const childObject = tiles[childId];

            let newTile;
            if(tooltip && tooltip.tileId === childId){
                newTile = (
                    <Tile key={childId}
                          data={childObject}
                          actions={actions}
                          tooltip={tooltip}>
                        {that._getChildren(childId)}
                    </Tile>
                );
            }else{
                newTile = (
                    <Tile key={childId}
                          data={childObject}
                          actions={actions}>
                        {that._getChildren(childId)}
                    </Tile>
                );
            }

            result.push(newTile);
        }

        return result;
    }


  render() {
    const {
        rootTileId,
        tiles,
        tooltip,
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
    let allTiles;
    if(tooltip && tooltip.tileId === tileObject.id){
        allTiles = (
            <Tile key={tileObject.id} 
                  data={tileObject}
                  actions={actions}
                  tooltip={tooltip}>
                {children}
            </Tile>
        );
    }else{
        allTiles = (
            <Tile key={tileObject.id} 
                  data={tileObject}
                  actions={actions}>
                {children}
            </Tile>
        );
    }

    return (
        <div>
          {allTiles}
        </div>
    );
  }
}

HomeView.propTypes = {
  tooltip: PropTypes.object,
  rootTileId: PropTypes.number.isRequired,
  tiles: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
