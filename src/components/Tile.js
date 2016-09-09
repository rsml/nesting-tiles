import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';
import TileObject from '../classes/TileObject';
// import TileStates from '../utils/TileStates';
import * as TileTypes from '../utils/TileTypes';
import Button from 'react-bootstrap/lib/Button';
// import Popover from 'react-bootstrap/lib/Popover';
import MyPopover from './MyPopover';
import Overlay from 'react-bootstrap/lib/Overlay';
import * as Utils from '../utils/index';
// import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import './Tile.css';
import './Tooltip.css';

export default class Tile extends Component {
    onHideOverlay() {
        const {
            actions
        } = this.props;

        actions.setTooltipIsVisible(false);
    }

    onShowOverlay() {
        // const {
        //     actions
        // } = this.props;

        // actions.setTooltipIsVisible(true);
    }

    onMouseEnter() {
        const {
            data,
            actions
        } = this.props;

        actions.updateHoverMenu({
            isVisible: true,
            tileId: data.id
        });
    }

    onMouseLeave() {
        const {
            data,
            hoverMenu,
            tooltip,
            actions
        } = this.props;

        if(hoverMenu && hoverMenu.tileId === data.id){
            if(tooltip && tooltip.tileId === data.id){
                return;
            }

            actions.updateHoverMenu({
                isVisible: false,
                tileId: null
            });
        }
    }

  handleShowInsertMenu() {
    const {
        data,
        actions
    } = this.props;

    actions.setTooltipIsVisible(true);
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

  onClickPopoverTabYoutube(){
    this.onClickPopoverTab(TileTypes.types.YOUTUBE);
  }

  onClickPopoverTabImage(){
    this.onClickPopoverTab(TileTypes.types.IMAGE);
  }

  onClickPopoverTabWebsite(){
    this.onClickPopoverTab(TileTypes.types.WEBSITE);
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
    if(tooltip.type === TileTypes.types.YOUTUBE){
        title = 'Youtube URL';
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
                bsClass='waves-effect waves-light btn'
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
        hoverMenu,
        children,
        data
    } = this.props;

    if(!data.children || data.children.length === 0){
        let tooltipHeight;
        const isExpanded = tooltip && tooltip.type;
        if(isExpanded){
            tooltipHeight = 220;
        }else{
            tooltipHeight = 60;
        }
        // tooltipHeight = 150;

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

        let classes = {
            tooltipHeader: classNames({
                'Tooltip-header': true,
                'Tooltip-header-expanded': isExpanded 
            }),
            tileTooltipIconContainer: function(tileType){
                return classNames({
                    'Tile-tooltip-icon-container': true,
                    'Tile-tooltip-icon-selected': (tooltip && tileType === tooltip.type)
                });
            },
            overlayContainer: classNames({
                'Overlay-move-up': isExpanded
            })
        }

        const popover = (
            <MyPopover id='popover-trigger-click-root-close'
                     title='Popover bottom'
                     arrowOffsetTop='10%'>
                <div key={`tooltip-height-${tooltipHeight}`}
                     style={{ width: 220, height: tooltipHeight }}
                     className='Tooltip'>
                    <div className={classes.tooltipHeader}>
                        <div className='Tooltip-header-inner'>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.YOUTUBE)}
                                 onClick={this.onClickPopoverTabYoutube.bind(this)}>
                                <img src={require('../images/youtube.svg')}
                                    alt=''
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Youtube
                                </div>*/}
                            </div>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.IMAGE)}
                                 onClick={this.onClickPopoverTabImage.bind(this)}>
                                <img src={require('../images/photo.svg')}
                                    alt=''
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Photo
                                </div>*/}
                            </div>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.WEBSITE)}
                                 onClick={this.onClickPopoverTabWebsite.bind(this)}>
                                <img src={require('../images/website.svg')}
                                    alt=''
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Website
                                </div>*/}
                            </div>
                        </div>
                    </div>
                    {tooltipBody}
                </div>
            </MyPopover>
        );

        const tooltipDOM = (
            <img ref='insert'
                src={require('../images/insert.svg')}
                alt=''
                className='Tile-menu-item Tile-menu-insert'
                onClick={this.handleShowInsertMenu.bind(this)} />
        );

        let overlayDOM;
        overlayDOM = (
            <div id='move-up' className={classes.overlayContainer}>
                <Overlay
                      show={(tooltip && tooltip.isVisible)}
                      onEntering={this.onShowOverlay.bind(this)}
                      onHide={this.onHideOverlay.bind(this)}
                      placement='right'
                      container={this}
                      animation={true}
                      arrowOffsetTop={10}
                      target={() => ReactDOM.findDOMNode(this.refs.insert)} >
                    {popover}
                </Overlay>
            </div>
        );

        let backgroundStyle;
        let innerDOM;
        if(data.type === TileTypes.types.IMAGE){
            backgroundStyle = {
                background: `url(${data.content}) no-repeat center center`,
                backgroundSize: 'contain'
            };
        }else if(data.type === TileTypes.types.YOUTUBE){
            innerDOM = (
                <iframe className='FullSize' src={Utils.getYoutubeEmbedUrlFromVideoUrl(data.content)} frameBorder='0' allowFullScreen />
            )
        }else if(data.type === TileTypes.types.WEBSITE){
            innerDOM = (
                <iframe className='FullSize' src={data.content} />
            )
        }

        const tileMenu = (hoverMenu && hoverMenu.isVisible) ? (
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
                {overlayDOM}
            </div>
        ) : null;

        return (
          <div className='Tile'
                style={backgroundStyle}
                id={`tile-${data.id}`}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}>
            {innerDOM}
            {tileMenu}
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
  hoverMenu: PropTypes.object,
  children: PropTypes.array,
  data: PropTypes.instanceOf(TileObject),
  actions: PropTypes.object.isRequired
};
