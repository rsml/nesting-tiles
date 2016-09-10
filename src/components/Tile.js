import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
// import MyPopover from './MyPopover';
import Overlay from 'react-bootstrap/lib/Overlay';
import * as Utils from '../utils/index';
import TileObject from '../classes/TileObject';
// import TileStates from '../utils/TileStates';
import * as TileTypes from '../utils/TileTypes';
// import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import './Tile.css';
import './Tooltip.css';


export default class Tile extends Component {
    handleMouseDownOnDragger(tileId) {
        const {
            data,
            actions
        } = this.props;
        actions.handleMouseDownOnDragger(tileId, data.content)
    }

    handleMouseMoveOnParentContainer(e){
        const { actions } = this.props;

        actions.handleMouseMoveOnParentContainer(e.clientX, e.clientY);
        e.preventDefault();
    }

    handleMouseUpOnParentContainer(){
        const { actions } = this.props;
        actions.handleMouseUpOnParentContainer()
    }

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

    onClick() {
        this.onMouseEnter();
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
    actions.setTooltipType(data.type || TileTypes.types.YOUTUBE);
    actions.setTooltipTileId(data.id);
    actions.setTooltipContent(data.content);
  }

  handleSplitVertical() {
    this.props.actions.insertBelow(this.props.data.id);
  }

  handleSplitHorizontal() {
    this.props.actions.insertToTheRightOf(this.props.data.id);
  }

  handleDeleteTile() {
    this.props.actions.deleteTile(this.props.data.id);
    this.props.actions.updateHoverMenu({
        isVisible: true,
        tileId: this.props.data.parentId
    });
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

    if(!tooltip){
        return null;
    }

    let title,
        placeholder;
    if(tooltip.type === TileTypes.types.YOUTUBE){
        title = 'Youtube URL';
        placeholder = 'youtube.com/watch?v=geluLZ-S21Q'
    }else if(tooltip.type === TileTypes.types.IMAGE){
        title = 'Image URL';
        placeholder = 'example.com/image.png';
    }else if(tooltip.type === TileTypes.types.WEBSITE){
        title = 'Website URL';
        placeholder = 'example.com';
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
                placeholder={placeholder}
                onChange={this.handleOnChangeContent.bind(this)} />

            <Button block={true}
                bsSize='large'
                bsStyle='primary'
                disabled={isDisabled}
                bsClass='btn-bottom blue waves-effect waves-light btn'
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
        data,
        isRootTile
    } = this.props;

    if(!data.children || data.children.length === 0){
        let tooltipHeight = 225;

        let tooltipBody = (
            <div className='Tooltip-body'>
                {this.getTooltipBody()}
            </div>
        );

        const tooltipType = (tooltip || {}).type;

        let classes = {
            tooltipHeader: classNames({
                'Tooltip-header': true,
                'Tooltip-header-expanded': true 
            }),
            tileTooltipIconContainer: function(tileType){
                return classNames({
                    'Tile-tooltip-icon-container': true,
                    'Tile-tooltip-icon-selected': (tooltip && tileType === tooltipType)
                });
            },
            overlayContainer: classNames({
                'Overlay-move-up': true
            })
        }

        const youtubeIcon = require(`../images/youtube${tooltipType !== TileTypes.types.YOUTUBE ? '-inactive' : ''}.svg`);
        const imageIcon = require(`../images/photo${tooltipType !== TileTypes.types.IMAGE ? '-inactive' : ''}.svg`);
        const websiteIcon = require(`../images/website${tooltipType !== TileTypes.types.WEBSITE ? '-inactive' : ''}.svg`);

        const popover = (
            <Popover id='popover-trigger-click-root-close'
                     title='Popover bottom'
                     arrowOffsetTop='10%'>
                <div key={`tooltip-height-${tooltipHeight}`}
                     style={{ width: 274, height: tooltipHeight }}
                     className='Tooltip'>
                    <div className={classes.tooltipHeader}>
                        <div className='Tooltip-header-inner'>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.YOUTUBE)}
                                 onClick={this.onClickPopoverTabYoutube.bind(this)}>
                                <img src={youtubeIcon}
                                    alt='Youtube'
                                    title='Youtube'
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Youtube
                                </div>*/}
                            </div>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.IMAGE)}
                                 onClick={this.onClickPopoverTabImage.bind(this)}>
                                <img src={imageIcon}
                                    alt='Photo'
                                    title='Photo'
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Photo
                                </div>*/}
                            </div>
                            <div className={classes.tileTooltipIconContainer(TileTypes.types.WEBSITE)}
                                 onClick={this.onClickPopoverTabWebsite.bind(this)}>
                                <img src={websiteIcon}
                                    alt='Website'
                                    title='Website'
                                    className='Tile-tooltip-icon' />
                                {/*<div className='Tile-tooltip-icon-label'>
                                    Website
                                </div>*/}
                            </div>
                        </div>
                    </div>
                    {tooltipBody}
                </div>
            </Popover>
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
                background: `url(${Utils.cleanURL(data.content)}) no-repeat center center`,
                backgroundSize: 'contain'
            };
        }else if(data.type === TileTypes.types.YOUTUBE){
            innerDOM = (
                <iframe className='full-size' src={Utils.getYoutubeEmbedUrlFromVideoUrl(data.content)} frameBorder='0' allowFullScreen />
            )
        }else if(data.type === TileTypes.types.WEBSITE){
            innerDOM = (
                <iframe className='full-size' src={Utils.cleanURL(data.content)} />
            )
        }

        const deleteIcon = require(`../images/delete${isRootTile ? '-disabled' : ''}.svg`);

        const tileMenu = (hoverMenu && hoverMenu.isVisible) ? (
            <div className='Tile-menu'>
                {tooltipDOM}
                <img src={require('../images/split-vertical.svg')}
                    alt=''
                    className='Tile-menu-item Tile-menu-split-vertical'
                    onClick={this.handleSplitVertical.bind(this)} />
                <img src={deleteIcon}
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
                id={`tile-${data.id}-${data.content}`}
                data-id={data.id}
                onClick={this.onClick.bind(this)}
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

    const classes = {
        first: function(splitVertical){
            return splitVertical ? 'Tile-container-left' : 'Tile-container-top';
        },
        second: function(splitVertical){
            return splitVertical ? 'Tile-container-right' : 'Tile-container-bottom';
        },
        dragger: classNames({
            'Tile-dragger': true,
            'Tile-dragger-horizontal': data.splitVertical === false,
            'Tile-dragger-vertical': data.splitVertical === true
        })
    }

    const styles = {
        first: function(splitVertical){
            return {
                [splitVertical ? 'width' : 'height']: `${data.percentage}%`
            }
        },
        second: function(splitVertical){
            return {
                [splitVertical ? 'width' : 'height']: `${100 - data.percentage}%`
            }
        }
    }

    return (
        <div id={`tile-${data.id}-${data.content}`}
             key={`tile-content-${data.content}`}
             className='Tile-container-full'
             onMouseMove={this.handleMouseMoveOnParentContainer.bind(this)}
             onMouseUp={this.handleMouseUpOnParentContainer.bind(this)}>
            <div className={classes.first(data.splitVertical)}
                 key={`first-${data.percentage}`}
                 style={styles.first(data.splitVertical)}>
                {children[0]}
            </div>
            <div className={classes.second(data.splitVertical)}
                 key={`second-${data.percentage}`}
                 style={styles.second(data.splitVertical)}>
                <div className={classes.dragger}
                     onMouseDown={this.handleMouseDownOnDragger.bind(this, data.id)} />
                {children[1]}
            </div>
        </div>
    );
  }
}

Tile.propTypes = {
  tooltip: PropTypes.object,
  hoverMenu: PropTypes.object,
  children: PropTypes.array,
  data: PropTypes.instanceOf(TileObject),
  isRootTile: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};
