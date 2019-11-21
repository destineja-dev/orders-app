import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { fade, withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import head from 'lodash/head';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import OrdersList from 'components/OrdersList';
import OrderDetails from 'components/OrderDetails';

import AddOrder from './AddOrder';
import AddManifest from './AddManifest';

import {
  loadDestinatingCompanies,
  loadCollectingCompanies,
  loadDrivers,
  loadVehicles,
  loadCustomers,
  loadWastes,
  selectOrder,
  loadOrders,
} from './actions';
import {
  makeSelectOrders,
  makeSelectCustomers,
  makeSelectWastes,
  makeSelectOrderSaved,
  makeSelectOrderSelected,
  makeSelectDestinatingCompanies,
  makeSelectCollectingCompanies,
  makeSelectDrivers,
  makeSelectVehicles,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const drawerWidth = 0;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  input: {
    margin: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

export class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddOrderDialog: false,
      openAddManifestDialog: false,
      snackbarOrderOpen: true,
    };
    this.setOpenAddOrderDialog = this.setOpenAddOrderDialog.bind(this);
    this.setOpenAddManifestDialog = this.setOpenAddManifestDialog.bind(this);
    this.handleSnackbarOrderCreated = this.handleSnackbarOrderCreated.bind(
      this,
    );
    this.onSaveOrder = this.onSaveOrder.bind(this);
    this.handleSelectOrder = this.handleSelectOrder.bind(this);
    this.selectFirstOrder = this.selectFirstOrder.bind(this);
  }

  componentDidMount() {
    const {
      fetchOrders,
      fetchCustomers,
      fetchWastes,
      chooseOrder,
      orders,
      customers,
      wastes,
      loading,
      orderSelected,
    } = this.props;
    if (!orders && !loading) fetchOrders();
    if (!customers && !loading) fetchCustomers();
    if (!wastes && !loading) fetchWastes();
    if (orders && !orderSelected) this.selectFirstOrder(orders);
  }

  selectFirstOrder(orders) {
    const { chooseOrder } = this.props;
    const sortedOrders = reverse(
      sortBy(orders, order => parseInt(order.number)),
    );
    chooseOrder(head(sortedOrders));
  }

  fetchEntitiesToAddOrderManifest() {
    const {
      fetchDestinatingCompanies,
      fetchCollectingCompanies,
      fetchDrivers,
      fetchVehicles,
      destinatingCompanies,
      collectingCompanies,
      drivers,
      vehicles,
      loading,
    } = this.props;
    if (!destinatingCompanies && !loading) fetchDestinatingCompanies();
    if (!collectingCompanies && !loading) fetchCollectingCompanies();
    if (!drivers && !loading) fetchDrivers();
    if (!vehicles && !loading) fetchVehicles();
  }

  onSaveOrder() {
    this.handleSnackbarOrderCreated(true);
  }

  setOpenAddOrderDialog(opened) {
    this.setState({
      openAddOrderDialog: opened,
    });
  }

  setOpenAddManifestDialog(opened) {
    this.fetchEntitiesToAddOrderManifest();
    this.setState({
      openAddManifestDialog: opened,
    });
  }

  handleSelectOrder(selectedOrder) {
    const { chooseOrder } = this.props;
    chooseOrder(selectedOrder);
  }

  handleSnackbarOrderCreated(open) {
    this.setState({ snackbarOrderOpen: open });
  }

  render() {
    const { classes, loading, orderSaved, orderSelected, orders } = this.props;
    const {
      openAddOrderDialog,
      openAddManifestDialog,
      snackbarOrderOpen,
    } = this.state;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Grid item xs={12} style={{ marginBottom: 5 }}>
                  <Paper className={classes.paper}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        disabled
                        placeholder="Procurar…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.setOpenAddOrderDialog(true)}
                        className={classes.button}
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} style={{ padding: 0 }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      marginLeft: 0,
                      marginRight: 0,
                      padding: 0,
                      overflow: 'auto',
                      height: 500,
                      maxHeight: '100%',
                    }}
                  >
                    <OrdersList
                      loading={loading}
                      list={orders || []}
                      onSelect={this.handleSelectOrder}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                {orderSelected && <OrderDetails
                  details={orderSelected || head(orders)}
                  onClickAddOrderManifest={() =>
                    this.setOpenAddManifestDialog(true)
                  }
                />}
              </Grid>
            </Grid>
            <Dialog
              fullScreen
              open={openAddOrderDialog}
              onClose={() => this.setOpenAddOrderDialog(false)}
              aria-labelledby="form-dialog-title"
            >
              <AddOrder
                onSaveOrder={this.onSaveOrder}
                done={() => this.setOpenAddOrderDialog(false)}
              />
            </Dialog>
            <Dialog
              fullScreen
              open={openAddManifestDialog}
              onClose={this.handleCloseAddOrderDialog}
              aria-labelledby="form-dialog-title"
            >
              <AddManifest
                done={() => this.setOpenAddManifestDialog(false)}
                onSaveManifestOrder={manifest => console.log(manifest)}
              />
            </Dialog>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={orderSaved && snackbarOrderOpen}
              autoHideDuration={3000}
              onClose={() => {
                this.setState({ snackbarOrderOpen: false });
              }}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span>Demanda criada com sucesso!</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  className={classes.close}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Container>
        </main>
      </div>
    );
  }
}

OrdersPage.propTypes = {
  loading: PropTypes.bool,
  orderSaved: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  orderSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  customers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  wastes: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  fetchOrders: PropTypes.func,
  chooseOrder: PropTypes.func,
  fetchCustomers: PropTypes.func,
  fetchWastes: PropTypes.func,
  classes: PropTypes.object.isRequired,
  destinatingCompanies: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  collectingCompanies: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  drivers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  vehicles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  fetchDestinatingCompanies: PropTypes.func,
  fetchCollectingCompanies: PropTypes.func,
  fetchDrivers: PropTypes.func,
  fetchVehicles: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchOrders: () => {
      dispatch(loadOrders());
    },
    fetchCustomers: () => {
      dispatch(loadCustomers());
    },
    fetchWastes: () => {
      dispatch(loadWastes());
    },
    chooseOrder: order => {
      dispatch(selectOrder(order));
    },
    fetchDestinatingCompanies: () => {
      dispatch(loadDestinatingCompanies());
    },
    fetchCollectingCompanies: () => {
      dispatch(loadCollectingCompanies());
    },
    fetchDrivers: () => {
      dispatch(loadDrivers());
    },
    fetchVehicles: () => {
      dispatch(loadVehicles());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
  customers: makeSelectCustomers(),
  wastes: makeSelectWastes(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  orderSaved: makeSelectOrderSaved(),
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

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'orders', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(OrdersPage);
