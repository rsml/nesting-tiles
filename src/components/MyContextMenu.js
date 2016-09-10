import React, { PropTypes, Component } from 'react';
import Directions from '../utils/Directions';
// import ContextMenu from 'react-context-menu';
import ContextMenu from './external/react-context-menu/ContextMenu';
import * as TileTypes from '../utils/TileTypes';

export default class MyContextMenu extends Component {

    /*handleAddContent() {
        const {
            activeTileObject,
            actions
        } = this.props;

        actions.setTooltipIsVisible(true);
        actions.setTooltipType(activeTileObject.type || TileTypes.types.YOUTUBE);
        actions.setTooltipTileId(activeTileObject.id);
        actions.setTooltipContent(activeTileObject.content);
    }*/

    handleRemoveContent () {
        const {
            activeTileObject,
            actions
        } = this.props;

        actions.setContextMenuPreventEvents(false);
        actions.cloneAllTilesAndSwapInNewTile();
        actions.setTooltipIsVisible(false);
        actions.setTooltipType(activeTileObject.type || TileTypes.types.YOUTUBE);
        actions.setTooltipTileId(activeTileObject.id);
        actions.setTooltipContent(null);
    }

    handleClickInsert(direction) {
        const {
            activeTileObject,
            actions
        } = this.props;

        actions.setContextMenuPreventEvents(false);

        switch(direction){
            case Directions.ABOVE:
                actions.insertAbove(activeTileObject.id);
                return;

            case Directions.BELOW:
                actions.insertBelow(activeTileObject.id);
                return;

            case Directions.LEFT:
                actions.insertToTheLeftOf(activeTileObject.id);
                return;

            case Directions.RIGHT:
                actions.insertToTheRightOf(activeTileObject.id);
                return;
        }

        if(direction === Directions.ABOVE){
            actions.insertAbove(activeTileObject.id);
        }else if(direction === Directions.ABOVE){
            actions.insertAbove(activeTileObject.id);
        }else if(direction === Directions.ABOVE){
            actions.insertAbove(activeTileObject.id);
        }if(direction === Directions.ABOVE){
            actions.insertAbove(activeTileObject.id);
        }

        // console.log(e);
        // console.log(data);
        // actions.deleteTile(activeTileObject.id)
    }

    handleClickDelete(e, data) {
        const {
            activeTileObject,
            actions
        } = this.props;

        console.log(e);
        console.log(data);
        actions.setContextMenuPreventEvents(false);
        actions.updateHoverMenuWithSibling({
            isVisible: true,
            parentId: activeTileObject.parentId,
            childId: activeTileObject.id
        });
        actions.deleteTile(activeTileObject.id);
    }

    render() {
        const {
            isRemoveContentEnabled,
            isDeleteEnabled,
            actions
        } = this.props;

        

        let items = [
            {
                'icon': null,
                'label': 'Insert Above',
                'function': this.handleClickInsert.bind(this, Directions.ABOVE)
            },
            {
                'icon': null,
                'label': 'Insert Below',
                'function': this.handleClickInsert.bind(this, Directions.BELOW)
            },
            {
                'icon': null,
                'label': 'Insert to the Left',
                'function': this.handleClickInsert.bind(this, Directions.LEFT)
            },
            {
                'icon': null,
                'label': 'Insert to the Right',
                'function': this.handleClickInsert.bind(this, Directions.RIGHT)
            }
        ];

        if(isRemoveContentEnabled){
            items.push({
                'icon': null,
                'label': 'Remove Content',
                'function': this.handleRemoveContent.bind(this)
            });
        }

        if(isDeleteEnabled){
            items.push({
                'icon': null,
                'label': 'Delete',
                'function': this.handleClickDelete.bind(this)
            });
        }

        return (
            <ContextMenu contextID='home-view'
                         items={items}
                         actions={actions} />
        );
    }
}

MyContextMenu.propTypes = {
    isRemoveContentEnabled: PropTypes.bool.isRequired,
    isDeleteEnabled: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    activeTileObject: PropTypes.object
}
