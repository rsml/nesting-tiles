import React, { Component, PropTypes } from 'react';
import MyContextMenu from '../components/MyContextMenu';
import Tile from '../components/Tile';
import * as Utils from '../utils/index';
import '../styles/FullSize.css';

class HomeView extends Component {
    componentDidMount() {
        let context = document.getElementById('home-view');
        context.addEventListener('contextmenu', this.handleOpenContextMenu.bind(this));
    }

    componentWillUnmount() {
        let context = document.getElementById('home-view');
        context.removeEventListener('contextmenu', this.handleOpenContextMenu.bind(this));
    }

    handleOpenContextMenu(e) {
        const {
            tiles,
            rootTileId,
            actions
        } = this.props;

        const id = Utils.findIdOfTileThatClickIsInsideOf(e.target);

        const tileObject = tiles[id];

        actions.setContextMenuIsRemoveContentEnabled(tileObject.content !==null && tileObject.content !== '');
        actions.setContextMenuIsDeleteEnabled(tileObject.id !== rootTileId);
        
        // these must come at the end of this function!
        actions.setContextMenuTileId(id);
        actions.setContextMenuPreventEvents(true);
    }

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
                          isRootTile={false}
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
                          isRootTile={false}
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
        contextMenu,
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
                  isRootTile={true}
                  data={tileObject}
                  actions={actions}
                  tooltip={tooltip}
                  percentage={tileObject.percentage}
                  hoverMenu={hoverMenuForTile}>
                {children}
            </Tile>
        );
    }else{
        allTiles = (
            <Tile key={tileObject.id}
                  isRootTile={true}
                  data={tileObject}
                  actions={actions}
                  percentage={tileObject.percentage}
                  hoverMenu={hoverMenu}>
                {children}
            </Tile>
        );
    }

    return (
        <div id='home-view' className='full-size'>
          {allTiles}
          <MyContextMenu 
                isRemoveContentEnabled={contextMenu.isRemoveContentEnabled}
                isDeleteEnabled={contextMenu.isDeleteEnabled}
                activeTileObject={tiles[contextMenu.tileId]}
                actions={actions} />
        </div>
    );
  }
}

HomeView.propTypes = {
  tooltip: PropTypes.object,
  hoverMenu: PropTypes.object,
  rootTileId: PropTypes.number.isRequired,
  tiles: PropTypes.object.isRequired,
  contextMenu: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default HomeView;
