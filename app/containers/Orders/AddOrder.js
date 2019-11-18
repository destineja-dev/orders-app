import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import OrderForm from 'components/OrderForm';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { saveOrder } from 'containers/Orders/actions';

import { makeSelectCustomers, makeSelectWastes } from './selectors';

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

class AddOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(order) {
    const { done, onSaveOrder, onSave } = this.props;
    onSave(order);
    onSaveOrder(order);
    done();
  }

  render() {
    const { classes, done, customers, wastes } = this.props;
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
              Adicionar Demanda
            </Typography>
          </Toolbar>
        </AppBar>
        <OrderForm
          customersList={customers || []}
          wastesList={wastes || []}
          onSubmit={this.handleSave}
        />
      </div>
    );
  }
}

AddOrderPage.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastes: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSaveOrder: PropTypes.func,
  onSave: PropTypes.func,
  done: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSave: order => {
      dispatch(saveOrder(order));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  customers: makeSelectCustomers(),
  wastes: makeSelectWastes(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(AddOrderPage);
