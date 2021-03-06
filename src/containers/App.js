import '../styles/FullSize.css';
import '../styles/App.css';
import '../styles/Fonts.css';
import '../styles/external/bootstrap.css';
import * as Actions from '../actions/tileActions';
import * as Utils from '../utils/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeView from '../views/HomeView';
import React, { Component, PropTypes } from 'react';

class App extends Component {
    onClick(e) {
        const { actions } = this.props;

        if(Utils.isDescendant(
                document.getElementById('popover-trigger-click-root-close'),
                e.nativeEvent.target
            )) {
            return;
        } else if(e.nativeEvent.target.classList.contains(
                'Tile-menu-insert')) {
            return;
        }

        // This should come before all over events in this function!
        actions.setTooltipIsVisible(false);
        actions.closeContextMenu();
    }

    render() {
        const {
            actions,
            tiles
        } = this.props;

        return(
            <div className='App FullSize'
                 onClick={this.onClick.bind(this)}>
                <HomeView rootTileId={tiles.rootTileId}
                          tiles={tiles.tiles}
                          tooltip={tiles.tooltip}
                          hoverMenu={tiles.hoverMenu}
                          contextMenu={tiles.contextMenu}
                          actions={actions} />
            </div>
        );
    }
}

App.propTypes = {
    'actions': PropTypes.object.isRequired,
    'tiles': PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        'tiles': state.tiles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        'actions': bindActionCreators(Actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

