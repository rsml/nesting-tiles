import React, { Component, PropTypes } from 'react';
import Tile from '../components/Tile';
import '../styles/FullSize.css';

export default class HomeView extends Component {
    getChildren(tileId) {
        const {
            tiles,
            tooltip,
            hoverMenu,
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
            const hoverMenuForTile = (hoverMenu && hoverMenu.tileId === childId) ? hoverMenu : null;
            if(tooltip && tooltip.tileId === childId){
                newTile = (
                    <Tile key={childId}
                          data={childObject}
                          actions={actions}
                          tooltip={tooltip}
                          hoverMenu={hoverMenuForTile}>
                        {that.getChildren(childId)}
                    </Tile>
                );
            }else{
                newTile = (
                    <Tile key={childId}
                          data={childObject}
                          actions={actions}
                          hoverMenu={hoverMenuForTile}>
                        {that.getChildren(childId)}
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
        hoverMenu,
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
    const children = that.getChildren(tileObject.id);
    let allTiles;
    const hoverMenuForTile = (hoverMenu && hoverMenu.tileId === tileObject.id) ? hoverMenu : null;
    if(tooltip && tooltip.tileId === tileObject.id){
        allTiles = (
            <Tile key={tileObject.id} 
                  data={tileObject}
                  actions={actions}
                  tooltip={tooltip}
                  hoverMenu={hoverMenuForTile}>
                {children}
            </Tile>
        );
    }else{
        allTiles = (
            <Tile key={tileObject.id} 
                  data={tileObject}
                  actions={actions}
                  hoverMenu={hoverMenu}>
                {children}
            </Tile>
        );
    }

    return (
        <div className='full-size'>
          {allTiles}
        </div>
    );
  }
}

HomeView.propTypes = {
  tooltip: PropTypes.object,
  hoverMenu: PropTypes.object,
  rootTileId: PropTypes.number.isRequired,
  tiles: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
