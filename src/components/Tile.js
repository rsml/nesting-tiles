import React, { Component, PropTypes } from 'react';
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';
import TileObject from '../classes/TileObject';
// import TileStates from '../utils/TileStates';
import * as TileTypes from '../utils/TileTypes';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import './Tile.css';
// import './Tooltip.css';

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

  onVisibleChange(tileId, visible) {
    if(visible){
        this.props.actions.setTooltipType(null);
        this.props.actions.setTooltipTileId(tileId);
    }
  }

  onClickVideo() {
    this.props.actions.setTooltipType(TileTypes.types.VIDEO);
    this.props.actions.setTooltipContent('');
  }

  onClickImage() {
    this.props.actions.setTooltipType(TileTypes.types.IMAGE);
    this.props.actions.setTooltipContent('');
  }

  onClickWebsite() {
    this.props.actions.setTooltipType(TileTypes.types.WEBSITE);
    this.props.actions.setTooltipContent('');
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
                value={tooltip.content}
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
        const isTooltipVisible = ((tooltip || {}).isVisible || false);
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

        const tooltipContents = (
            <div key={`tooltip-height-${tooltipHeight}`}
                 style={{ width: 210, height: tooltipHeight }}
                 className='Tooltip'>
                <div className='Tooltip-header'>
                    <div className='Tile-tooltip-icon-container'
                         onClick={this.onClickVideo.bind(this)}>
                        <img src={require('../images/insert.svg')}
                            alt=''
                            className='Tile-tooltip-icon' />
                        <div className='Tile-tooltip-icon-label'>
                            Video
                        </div>
                    </div>
                    <div className='Tile-tooltip-icon-container'
                         onClick={this.onClickImage.bind(this)}>
                        <img src={require('../images/insert.svg')}
                            alt=''
                            className='Tile-tooltip-icon' />
                        <div className='Tile-tooltip-icon-label'>
                            Photo
                        </div>
                    </div>
                    <div className='Tile-tooltip-icon-container'
                         onClick={this.onClickWebsite.bind(this)}>
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
        );
        const insertIcon = (
            <img src={require('../images/insert.svg')}
                    alt=''
                     onClick={this.handleSetTooltipIsVisible.bind(this)}
                    className='Tile-menu-item Tile-menu-insert' />
        );
        const tooltipDOM = (isTooltipVisible) ? (
            <div onClick={this.handleSetTooltipIsVisible.bind(this)}>
                <Tooltip
                      placement='right'
                      mouseEnterDelay={0}
                      mouseLeaveDelay={0.1}
                      destroyTooltipOnHide={true}
                      onVisibleChange={this.onVisibleChange.bind(this, data.id)}
                      trigger='click'
                      overlay={tooltipContents}
                      align={{ offset: [0, 0] }}
                      transitionName='rc-tooltip-zoom'>
                      {insertIcon}
                </Tooltip>
            </div>
        ) : (insertIcon);

        debugger;

        return (
          <div id={`tile-${data.id}`}>

                ID: {data.id}
            <div className='Tile-menu'>
                {tooltipDOM}
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
