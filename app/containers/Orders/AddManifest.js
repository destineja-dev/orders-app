import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import ManifestForm from 'components/ManifestForm';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { saveOrderManifest } from 'containers/Orders/actions';

import {
  makeSelectOrderSelected,
  makeSelectDestinatingCompanies,
  makeSelectCollectingCompanies,
  makeSelectDrivers,
  makeSelectVehicles,
} from './selectors';

const drawerWidth = 0;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

class AddManifest extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(manifest) {
    const { done, onSaveManifestOrder, onSave, orderSelected } = this.props;
    const { arrivalTime, departureTime } = manifest;
    const data = {
      ...manifest,
      arrivalTime: moment(arrivalTime).format('hh:mm'),
      departureTime: moment(departureTime).format('hh:mm'),
    };
    onSave(orderSelected.id, data);
    onSaveManifestOrder(data);
    done();
  }

  render() {
    const {
      classes,
      done,
      orderSelected,
      destinatingCompanies,
      collectingCompanies,
      drivers,
      vehicles,
    } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={done}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Informar coleta para a demanda #{orderSelected.number} - {orderSelected.customer.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <ManifestForm
          destinatingCompaniesList={destinatingCompanies || []}
          collectingCompaniesList={collectingCompanies || []}
          driversList={drivers || []}
          vehiclesList={vehicles || []}
          wastesList={orderSelected.items || []}
          onSubmit={this.handleSave}
        />
      </div>
    );
  }
}

AddManifest.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastes: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  orderSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSaveManifestOrder: PropTypes.func,
  onSave: PropTypes.func,
  done: PropTypes.func,
  destinatingCompanies: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  collectingCompanies: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  drivers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  vehicles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onSave: (orderId, manifest) => {
      dispatch(saveOrderManifest(orderId, manifest));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  orderSelected: makeSelectOrderSelected(),
  destinatingCompanies: makeSelectDestinatingCompanies(),
  collectingCompanies: makeSelectCollectingCompanies(),
  drivers: makeSelectDrivers(),
  vehicles: makeSelectVehicles(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(AddManifest);
