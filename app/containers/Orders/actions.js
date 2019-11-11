import { LOAD_ORDERS, ORDERS_LOADED, LOAD_ORDERS_ERROR } from './constants';

export function loadOrders() {
  return {
    type: LOAD_ORDERS,
  };
}

export function loadOrdersError(error) {
  return {
    type: LOAD_ORDERS_ERROR,
    error,
  };
}

export function ordersLoaded(orders) {
  return {
    type: ORDERS_LOADED,
    orders,
  };
}
