import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const makeSelectOrders = () =>
  createSelector(selectGlobal, ordersState => ordersState.get('orders'));

export { selectGlobal, makeSelectOrders };
