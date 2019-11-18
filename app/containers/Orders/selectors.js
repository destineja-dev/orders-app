import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const makeSelectOrders = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('orders'));

const makeSelectCustomers = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('customers'));

const makeSelectWastes = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('wastes'));

const makeSelectOrderSaved = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('orderSaved'));

const makeSelectOrderSelected = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('orderSelected'));

const makeSelectDestinatingCompanies = () =>
  createSelector(selectGlobal, ordersState =>
    ordersState.get('destinatingCompanies'),
  );

const makeSelectCollectingCompanies = () =>
  createSelector(selectGlobal, ordersState =>
    ordersState.get('collectingCompanies'),
  );

const makeSelectDrivers = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('drivers'));

const makeSelectVehicles = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('vehicles'));

export {
  selectGlobal,
  makeSelectOrders,
  makeSelectCustomers,
  makeSelectWastes,
  makeSelectOrderSaved,
  makeSelectOrderSelected,
  makeSelectDestinatingCompanies,
  makeSelectCollectingCompanies,
  makeSelectDrivers,
  makeSelectVehicles,
};
