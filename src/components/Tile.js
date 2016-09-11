import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
import Overlay from 'react-bootstrap/lib/Overlay';
import * as Utils from '../utils/index';
import TileObject from '../classes/TileObject';
import * as TileTypes from '../utils/TileTypes';
import '../styles/Tile.scss';
import '../styles/Popover.css';
import '../styles/Tooltip.scss';

export default class Tile extends Component {
    componentDidMount() {
        this.focusOnInput();
    }

    componentDidUpdate() {
        this.focusOnInput();
    }

    focusOnInput() {
        const input = this.refs.contentInput;
        if(input) {
            input.focus();
        }
    }

    handleMouseDownOnDragger(tileId) {
        const {
            data,
            actions
        } = this.props;
        actions.handleMouseDownOnDragger(tileId, data.content);
    }

    handleMouseMoveOnParentContainer(e) {
        const { actions } = this.props;

        actions.handleMouseMoveOnParentContainer(e.clientX, e.clientY);
        e.preventDefault();
    }

    handleMouseUpOnParentContainer() {
        const { actions } = this.props;
        actions.handleMouseUpOnParentContainer();
    }

    onHideOverlay() {
        const { actions } = this.props;
        actions.setTooltipIsVisible(false);
    }

    onShowOverlay() {
        // noop
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
            'isVisible': true,
            'tileId': data.id
        });
    }

    onMouseLeave() {
        const {
            data,
            hoverMenu,
            tooltip,
            actions
        } = this.props;

        if(hoverMenu && hoverMenu.tileId === data.id) {
            if(tooltip && tooltip.tileId === data.id) {
                return;
            }

            actions.updateHoverMenu({
                'isVisible': false,
                'tileId': null
            });
        }
    }

    handleShowInsertMenu() {
        const {
            tooltip,
            data,
            actions
        } = this.props;

        actions.closeContextMenu();

        // If the insert menu is currently visible, it should be hidden
        if(tooltip && tooltip.isVisible && tooltip.tileId === data.id) {
            actions.setTooltipIsVisible(false);
            actions.setTooltipTileId(null);
            return;
        }

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
        this.props.actions.updateHoverMenuWithSibling({
            'isVisible': true,
            'parentId': this.props.data.parentId,
            'childId': this.props.data.id
        });
        this.props.actions.deleteTile(this.props.data.id);
    }

    handleOnChangeContent(e) {
        const {
            tooltip,
            actions
        } = this.props;

        if(!tooltip) {
            return;
        }

        actions.setTooltipContent(e.target.value);
    }

    handleOnKeyPress(e) {
        const {
            tooltip,
            actions
        } = this.props;

        if(e.key === 'Enter' && Utils.validateURL(tooltip.content)){
            actions.submitTooltip(tooltip.type, tooltip.content);
        }
    }

    handleClickDone() {
        const {
            tooltip,
            actions
        } = this.props;

        if(!tooltip) {
            return;
        }

        actions.submitTooltip(tooltip.type, tooltip.content);
    }

    onClickTabYoutube(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onClickTab(TileTypes.types.YOUTUBE);
    }

    onClickTabImage(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onClickTab(TileTypes.types.IMAGE);
    }

    onClickTabWebsite(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onClickTab(TileTypes.types.WEBSITE);
    }

    onClickTab(tileType) {
        const {
            actions,
            data
        } = this.props;

        actions.setTooltipType(tileType);

        let newContent = '';
        if(data.type === tileType) {
            newContent = data.content;
        } else {
            newContent = '';
        }

        actions.setTooltipContent(newContent);
    }

    getPopover() {
        const { tooltip } = this.props;

        const tooltipType = (tooltip || {}).type;
        const youtubeIcon = require(
            `../images/youtube${tooltipType !== TileTypes.types.YOUTUBE ?
                                    '-inactive' : ''}.svg`
        );
        const imageIcon = require(
            `../images/photo${tooltipType !== TileTypes.types.IMAGE ?
                                    '-inactive' : ''}.svg`
        );
        const websiteIcon = require(
            `../images/website${tooltipType !== TileTypes.types.WEBSITE ?
                                    '-inactive' : ''}.svg`
        );

        const tooltipBody = (
            <div className='Tooltip-body'>
                {this.getTooltipBody()}
            </div>
        );

        const classes = {
            'tileTooltipIconContainer': function (tileType) {
                return classNames({
                    'Tile-tooltip-icon-container': true,
                    'Tile-tooltip-icon-selected': (
                        tooltip && tileType ===
                        tooltipType)
                });
            }
        };

        const types = TileTypes.types;
        const imageClass = classes.tileTooltipIconContainer(types.IMAGE),
              websiteClass = classes.tileTooltipIconContainer(types.WEBSITE),
              youtubeClass = classes.tileTooltipIconContainer(types.YOUTUBE);

        const tooltipHeight = 225;
        return(
            <Popover id='popover-trigger-click-root-close'
                 title='Popover bottom'
                 arrowOffsetTop='10%'>
                <div key={`tooltip-height-${tooltipHeight}`}
                     style={{ 'width': 274, 'height': tooltipHeight }}
                     className='Tooltip'>
                    <div className='Tooltip-header'>
                        <div className='Tooltip-header-inner'>
                            <div className={youtubeClass}
                                 onClick={this.onClickTabYoutube.bind(this)}>
                                <img src={youtubeIcon}
                                    alt='Youtube'
                                    title='Youtube'
                                    className='Tile-tooltip-icon' />
                            </div>
                            <div className={imageClass}
                                 onClick={this.onClickTabImage.bind(this)}>
                                <img src={imageIcon}
                                    alt='Photo'
                                    title='Photo'
                                    className='Tile-tooltip-icon' />
                            </div>
                            <div className={websiteClass}
                                 onClick={this.onClickTabWebsite.bind(this)}>
                                <img src={websiteIcon}
                                    alt='Website'
                                    title='Website'
                                    className='Tile-tooltip-icon' />
                            </div>
                        </div>
                    </div>
                    {tooltipBody}
                </div>
            </Popover>
        );
    }

    getTooltipBody() {
        const { tooltip } = this.props;

        if(!tooltip) {
            return null;
        }

        let placeholder,
            title;
        if(tooltip.type === TileTypes.types.YOUTUBE) {
            title = 'Youtube URL';
            placeholder = 'youtube.com/watch?v=geluLZ-S21Q';
        } else if(tooltip.type === TileTypes.types.IMAGE) {
            title = 'Image URL';
            placeholder = 'example.com/image.png';
        } else if(tooltip.type === TileTypes.types.WEBSITE) {
            title = 'Website URL';
            placeholder = 'example.com';
        }

        let isDisabled = !tooltip ||
            !tooltip.content ||
            tooltip.content.length === 0;

        if(!Utils.validateURL(tooltip.content)) {
            isDisabled = true;
        }

        return(
            <div>
                <div className='Tooltip-title'>
                    {title}
                </div>
                <input
                    tabIndex='0'
                    ref='contentInput'
                    className='Tooltip-input'
                    type='text'
                    value={tooltip.content || ''}
                    placeholder={placeholder}
                    onChange={this.handleOnChangeContent.bind(this)}
                    onKeyPress={this.handleOnKeyPress.bind(this)} />

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
        );
    }

    render() {
        const {
            tooltip,
            hoverMenu,
            children,
            data,
            isRootTile
        } = this.props;

        if(!data.children || data.children.length === 0) {
            const classes = {
                'overlayContainer': classNames({
                    'Overlay-move-up': true
                })
            };

            const tooltipDOM = (
                <img ref='insert'
                    src={require('../images/insert.svg')}
                    alt=''
                    title='Add Content'
                    className='Tile-menu-item Tile-menu-insert'
                    onClick={this.handleShowInsertMenu.bind(this)} />
            );

            const overlayDOM = (
                <div id='move-up' className={classes.overlayContainer}>
                    <Overlay
                          show={(tooltip && tooltip.isVisible)}
                          onEntering={this.onShowOverlay.bind(this)}
                          onHide={this.onHideOverlay.bind(this)}
                          placement='right'
                          container={this}
                          animation={true}
                          arrowOffsetTop={10}
                          target={() => ReactDOM.findDOMNode(this.refs.insert)}>
                        {this.getPopover()}
                    </Overlay>
                </div>
            );

            let backgroundStyle;
            let innerDOM;
            if(data.type === TileTypes.types.IMAGE) {
                backgroundStyle = {
                    'background': `url(${Utils.cleanURL(data.content)}) \
                                 no-repeat center center`,
                    'backgroundSize': 'contain'
                };
            } else if(data.type === TileTypes.types.YOUTUBE) {
                innerDOM = (
                    <iframe
                        className='full-size'
                        src={Utils.getYoutubeEmbedUrlFromVideoURL(data.content)}
                        frameBorder='0'
                        allowFullScreen />
                );
            } else if(data.type === TileTypes.types.WEBSITE) {
                innerDOM = (
                    <iframe
                        className='full-size'
                        src={Utils.cleanURL(data.content)} />
                );
            }

            const deleteIcon = require(
                `../images/delete${isRootTile ? '-disabled' : ''}.svg`);

            const tileMenu = (hoverMenu && hoverMenu.isVisible) ? (
                <div className='Tile-menu'>
                    {tooltipDOM}
                    <img src={require('../images/split-vertical.svg')}
                        alt=''
                        title='Split Vertical'
                        className='Tile-menu-item Tile-menu-split-vertical'
                        onClick={this.handleSplitVertical.bind(this)} />
                    <img src={deleteIcon}
                        alt=''
                        title='Delete Tile'
                        className='Tile-menu-item Tile-menu-delete'
                        onClick={this.handleDeleteTile.bind(this)} />
                    <img src={require('../images/split-horizontal.svg')}
                        alt=''
                        title='Split Horizontal'
                        className='Tile-menu-item Tile-menu-split-horizontal'
                        onClick={this.handleSplitHorizontal.bind(this)} />
                    {overlayDOM}
                </div>
            ) : null;

            return(
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

        const splitVerticalIsInvalid = data.splitVertical !== true &&
                                       data.splitVertical !== false;
        if(children.length !== 2 || splitVerticalIsInvalid) {
            return(
                <div>
                    Improperly formatted tile
                </div>
            );
        }

        const classes = {
            'first': function (splitVertical) {
                return splitVertical ? 'Tile-container-left' :
                    'Tile-container-top';
            },
            'second': function (splitVertical) {
                return splitVertical ? 'Tile-container-right' :
                    'Tile-container-bottom';
            },
            'dragger': classNames({
                'Tile-dragger': true,
                'Tile-dragger-horizontal': data.splitVertical ===
                    false,
                'Tile-dragger-vertical': data.splitVertical ===
                    true
            })
        };

        const styles = {
            'first': function (splitVertical) {
                const key = splitVertical ? 'width' : 'height';
                return {
                    [key]: `${data.percentage}%`
                };
            },
            'second': function (splitVertical) {
                const key = splitVertical ? 'width' : 'height';
                return {
                    [key]: `${100 - data.percentage}%`
                };
            }
        };

        return(
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
                         onMouseDown={this.handleMouseDownOnDragger
                                          .bind(this, data.id)} />
                    {children[1]}
                </div>
            </div>
        );
    }
}

Tile.propTypes = {
    'tooltip': PropTypes.object,
    'hoverMenu': PropTypes.object,
    'children': PropTypes.array,
    'data': PropTypes.instanceOf(TileObject),
    'isRootTile': PropTypes.bool.isRequired,
    'actions': PropTypes.object.isRequired
};
