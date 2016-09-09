import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import DevTools from './DevTools';
import { connect } from 'react-redux';
import * as Actions from '../actions/tileActions';
import HomeView from '../views/HomeView';
import '../styles/FullSize.css';

export const App = (props) => {
    const {
        actions,
        tiles
    } = props;

    return (
        <div className='FullSize'>
            <HomeView rootTileId={tiles.rootTileId}
                      tiles={tiles.tiles}
                      tooltip={tiles.tooltip}
                      hoverMenu={tiles.hoverMenu}
                      actions={actions} />
            <DevTools />
        </div>
    );
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    tiles: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tiles: state.tiles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
