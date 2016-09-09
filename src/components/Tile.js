import React, { Component, PropTypes } from 'react';
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';
import TileObject from '../classes/TileObject';
// import TileStates from '../utils/TileStates';
import * as TileTypes from '../utils/TileTypes';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import './Tile.css';
// import './Tooltip.css';

export default class Tile extends Component {
  handleShowInsertMenu() {
    const {
        data,
        actions
    } = this.props;

    actions.setTooltipType(data.type);
    actions.setTooltipTileId(data.id);
    actions.setTooltipContent(data.content);
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

  handleOnChangeContent(e) {
    const {
        tooltip,
        actions
    } = this.props;

    if(!tooltip){
        return;
    }

    actions.setTooltipContent(e.target.value);
  }

  handleSetTooltipIsVisible() {
    this.props.actions.setTooltipIsVisible(true);
  }

  handleClickDone() {
    const {
        tooltip,
        actions
    } = this.props;

    if(!tooltip){
        return;
    }

    actions.submitTooltip(tooltip.type, tooltip.content);
  }
  
  onClickPopoverTab(tileType) {
    const {
        actions,
        data
    } = this.props;
    
    actions.setTooltipType(tileType);

    let newContent = '';
    if(data.type === tileType){
        newContent = data.content;
    }else{
        newContent = '';
    }

    actions.setTooltipContent(newContent);
  }

  getTooltipBody() {
    const {
        tooltip
    } = this.props;

    let title;
    if(tooltip.type === TileTypes.types.VIDEO){
        title = 'Video URL';
    }else if(tooltip.type === TileTypes.types.IMAGE){
        title = 'Image URL';
    }else if(tooltip.type === TileTypes.types.WEBSITE){
        title = 'Website URL';
    }

    const isDisabled = !tooltip || !tooltip.content || tooltip.content.length === 0;

    return (
        <div>
            <div className='Tooltip-title'>
                {title}
            </div>
            <input className='Tooltip-input'
                type='text'
                value={tooltip.content || ''}
                onChange={this.handleOnChangeContent.bind(this)} />

            <Button block={true}
                bsSize='large'
                bsStyle='primary'
                disabled={isDisabled}
                onClick={this.handleClickDone.bind(this)}
                type='button'>
                Done
            </Button>
        </div>
    )
  }

  render() {
    const {
        tooltip,
        children,
        data
    } = this.props;

    if(!children || children.length === 0){
        let tooltipHeight;
        const isExpanded = tooltip && tooltip.type;
        if(isExpanded){
            tooltipHeight = 300;
        }else{
            tooltipHeight = 90;
        }

        let tooltipBody;

        if(isExpanded){
            tooltipBody = (
                <div className='Tooltip-body'>
                    {this.getTooltipBody()}
                </div>
            );
        } else {
            tooltipBody = null;
        }

        const popover = (
            <Popover id='popover-trigger-click-root-close' title='Popover bottom'>
                <div key={`tooltip-height-${tooltipHeight}`}
                     style={{ width: 210, height: tooltipHeight }}
                     className='Tooltip'>
                    <div className='Tooltip-header'>
                        <div className='Tile-tooltip-icon-container'
                             onClick={this.onClickPopoverTab.bind(this, TileTypes.types.VIDEO)}>
                            <img src={require('../images/insert.svg')}
                                alt=''
                                className='Tile-tooltip-icon' />
                            <div className='Tile-tooltip-icon-label'>
                                Video
                            </div>
                        </div>
                        <div className='Tile-tooltip-icon-container'
                             onClick={this.onClickPopoverTab.bind(this, TileTypes.types.WEBSITE)}>
                            <img src={require('../images/insert.svg')}
                                alt=''
                                className='Tile-tooltip-icon' />
                            <div className='Tile-tooltip-icon-label'>
                                Photo
                            </div>
                        </div>
                        <div className='Tile-tooltip-icon-container'
                             onClick={this.onClickPopoverTab.bind(this, TileTypes.types.IMAGE)}>
                            <img src={require('../images/insert.svg')}
                                alt=''
                                className='Tile-tooltip-icon' />
                            <div className='Tile-tooltip-icon-label'>
                                Website
                            </div>
                        </div>
                    </div>
                    {tooltipBody}
                </div>
            </Popover>
        );

        const tooltipDOM = (
            <OverlayTrigger trigger='click' rootClose placement='right' overlay={popover}>
                <img src={require('../images/insert.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-insert'
                    onClick={this.handleShowInsertMenu.bind(this)} />
            </OverlayTrigger>
        );

        debugger;

        const backgroundStyle = {
            background: `url(${data.content}) no-repeat center center`,
            backgroundSize: 'contain'
        };

        return (
          <div className='Tile' style={backgroundStyle} id={`tile-${data.id}`}>
            <div className='Tile-menu'>
                {tooltipDOM}
                <img src={require('../images/split-vertical.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-vertical'
                    onClick={this.handleSplitVertical.bind(this)} />
                <img src={require('../images/delete.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-delete'
                    onClick={this.handleDeleteTile.bind(this)} />
                <img src={require('../images/split-horizontal.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-horizontal'
                    onClick={this.handleSplitHorizontal.bind(this)} />
            </div>
          </div>
        );
    }

    if(children.length !== 2 || (data.splitVertical !== true && data.splitVertical !== false)){
        return (
            <div>
                Improperly formatted tile
            </div>
        );
    }

    if(data.splitVertical){
        return (
            <div className='Tile-container-full'>
                <div className='Tile-container-top'>
                    {children[0]}
                </div>
                <div className='Tile-container-bottom'>
                    {children[1]}
                </div>
            </div>
        );
    }else{
        return (
            <div className='Tile-container-full'>
                <div className='Tile-container-left'>
                    {children[0]}
                </div>
                <div className='Tile-container-right'>
                    {children[1]}
                </div>
            </div>
        );
    }
  }
}

Tile.propTypes = {
  tooltip: PropTypes.object,
  children: PropTypes.array,
  data: PropTypes.instanceOf(TileObject),
  actions: PropTypes.object.isRequired
};
