import { fromJS } from 'immutable';
import find from 'lodash/find';
import remove from 'lodash/remove';
import {
  LOAD_ORDERS,
  LOAD_ORDERS_ERROR,
  ORDERS_LOADED,
  SELECT_ORDER,
  ORDER_MANIFEST_LOADED,
  SAVE_ORDER,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_ERROR,
  SAVE_ORDER_MANIFEST,
  SAVE_ORDER_MANIFEST_SUCCESS,
  SAVE_ORDER_MANIFEST_ERROR,
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_ERROR,
  CUSTOMERS_LOADED,
  LOAD_WASTES,
  LOAD_WASTES_ERROR,
  WASTES_LOADED,
  LOAD_COLLECTING_COMPANIES,
  COLLECTING_COMPANIES_LOADED,
  LOAD_COLLECTING_COMPANIES_ERROR,
  LOAD_DESTINATING_COMPANIES,
  DESTINATING_COMPANIES_LOADED,
  LOAD_DESTINATING_COMPANIES_ERROR,
  LOAD_DRIVERS,
  DRIVERS_LOADED,
  LOAD_DRIVERS_ERROR,
  LOAD_VEHICLES,
  VEHICLES_LOADED,
  LOAD_VEHICLES_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  orders: false,
  orderSaved: false,
  orderSelected: false,
  customers: false,
  wastes: false,
});

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return state
        .set('orderSaved', false)
        .set('loading', true)
        .set('error', false);
    case ORDERS_LOADED:
      return state.set('orders', action.orders).set('loading', false);
    case LOAD_ORDERS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SELECT_ORDER:
      return state.set('orderSelected', action.order);
    case ORDER_MANIFEST_LOADED: {
      const { manifest } = action;
      const order = state.get('orderSelected');
      return state.set('orderSelected', {
        ...order,
        manifest,
      });
    }
    case SAVE_ORDER:
      return state.set('loading', true).set('error', false);
    case SAVE_ORDER_SUCCESS: {
      const orders = state.get('orders');
      orders.push(action.order);
      return state
        .set('loading', false)
        .set('orders', orders)
        .set('orderSaved', true);
    }
    case SAVE_ORDER_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SAVE_ORDER_MANIFEST:
      return state.set('loading', true).set('error', false);
    case SAVE_ORDER_MANIFEST_SUCCESS: {
      const orders = state.get('orders');
      const {
        manifest,
        manifest: { order },
      } = action;
      remove(orders, o => o.id === order.id);
      orders.push(order);
      return state
        .set('loading', false)
        .set('orders', orders)
        .set('orderSelected', {
          ...order,
          manifest,
        });
    }
    case SAVE_ORDER_MANIFEST_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_CUSTOMERS:
      return state.set('loading', true).set('error', false);
    case CUSTOMERS_LOADED:
      return state.set('customers', action.customers).set('loading', false);
    case LOAD_CUSTOMERS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_WASTES:
      return state.set('loading', true).set('error', false);
    case WASTES_LOADED:
      return state.set('wastes', action.wastes).set('loading', false);
    case LOAD_WASTES_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_COLLECTING_COMPANIES:
      return state.set('loading', true).set('error', false);
    case COLLECTING_COMPANIES_LOADED:
      return state
        .set('collectingCompanies', action.collectingCompanies)
        .set('loading', false);
    case LOAD_COLLECTING_COMPANIES_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_DESTINATING_COMPANIES:
      return state.set('loading', true).set('error', false);
    case DESTINATING_COMPANIES_LOADED:
      return state
        .set('destinatingCompanies', action.destinatingCompanies)
        .set('loading', false);
    case LOAD_DESTINATING_COMPANIES_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_DRIVERS:
      return state.set('loading', true).set('error', false);
    case DRIVERS_LOADED:
      return state.set('drivers', action.drivers).set('loading', false);
    case LOAD_DRIVERS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_VEHICLES:
      return state.set('loading', true).set('error', false);
    case VEHICLES_LOADED:
      return state.set('vehicles', action.vehicles).set('loading', false);
    case LOAD_VEHICLES_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default orderReducer;
