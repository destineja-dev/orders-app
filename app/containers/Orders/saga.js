/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_ORDERS } from './constants';
import { ordersLoaded, loadOrdersError } from './actions';

export function* fetchOrders() {
  const ordersUrl = `http://destineja-customer-api.herokuapp.com/api/orders`;
  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, ordersUrl);
    yield put(ordersLoaded(orders));
  } catch (err) {
    yield put(loadOrdersError(err));
  }
}

export default function* watchOrders() {
  yield takeLatest(LOAD_ORDERS, fetchOrders);
}
