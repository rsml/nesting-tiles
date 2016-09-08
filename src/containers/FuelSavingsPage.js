import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import FuelSavingsForm from '../components/FuelSavingsForm';
import DevTools from './DevTools';

export const FuelSavingsPage = (props) => {
  return (
    <div>
        <FuelSavingsForm
          saveFuelSavings={props.actions.saveFuelSavings}
          calculateFuelSavings={props.actions.calculateFuelSavings}
          fuelSavings={props.fuelSavings}
        />
        <DevTools />
    </div>
  );
};

FuelSavingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
