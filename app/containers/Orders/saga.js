import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  LOAD_ORDERS,
  SAVE_ORDER,
  SAVE_ORDER_MANIFEST,
  LOAD_CUSTOMERS,
  LOAD_WASTES,
  SELECT_ORDER,
  LOAD_DESTINATING_COMPANIES,
  LOAD_COLLECTING_COMPANIES,
  LOAD_DRIVERS,
  LOAD_VEHICLES,
} from './constants';
import {
  ordersLoaded,
  orderSaved,
  orderSavedError,
  orderManifestSaved,
  orderManifestSavedError,
  orderManifestLoaded,
  loadOrdersError,
  customersLoaded,
  loadCustomersError,
  wastesLoaded,
  loadWastesError,
  collectingCompaniesLoaded,
  loadCollectingCompaniesError,
  destinatingCompaniesLoaded,
  loadDestinatingCompaniesError,
  driversLoaded,
  loadDriversError,
  vehiclesLoaded,
  loadVehiclesError,
} from './actions';

/**
 * fetch customers api
 */
export function* fetchCustomers() {
  const ordersUrl = `/customers`;
  try {
    // Call our request helper (see 'utils/request')
    const customers = yield call(request, ordersUrl);
    yield put(customersLoaded(customers));
  } catch (err) {
    yield put(loadCustomersError(err));
  }
}

/**
 * fectch orders api
 */
export function* fetchOrders() {
  const ordersUrl = `/orders`;
  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, ordersUrl);
    yield put(ordersLoaded(orders));
  } catch (err) {
    yield put(loadOrdersError(err));
  }
}

/**
 * post order api
 */
export function* postOrder(action) {
  const ordersUrl = `/orders`;
  try {
    const { order: body } = action;
    const options = {
      method: 'post',
      body,
    };
    const response = yield call(request, ordersUrl, options);
    yield put(orderSaved(response));
  } catch (err) {
    yield put(orderSavedError(err));
  }
}

/**
 * fectch wastes api
 */
export function* fetchWastes() {
  const ordersUrl = `/wastes`;
  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, ordersUrl);
    yield put(wastesLoaded(orders));
  } catch (err) {
    yield put(loadWastesError(err));
  }
}

export function* fetchManifestOrder(action) {
  const { order } = action;
  const url = `/orders/${order.id}/manifests`;
  try {
    // Call our request helper (see 'utils/request')
    const manifest = yield call(request, url);
    yield put(orderManifestLoaded(manifest));
  } catch (err) {
    yield put(loadWastesError(err));
  }
}

export function* postOrderManifest(action) {
  const { orderId, manifest: body } = action;
  const url = `/orders/${orderId}/manifests`;
  try {
    const options = {
      method: 'post',
      body,
    };
    const response = yield call(request, url, options);
    yield put(orderManifestSaved(response));
  } catch (err) {
    yield put(orderManifestSavedError(err));
  }
}

/**
 * fectch collecting companies api
 */
export function* fetchCollectingCompanies() {
  const url = `/collecting-companies`;
  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, url);
    yield put(collectingCompaniesLoaded(list));
  } catch (err) {
    yield put(loadCollectingCompaniesError(err));
  }
}

/**
 * fectch collecting companies api
 */
export function* fetchDestinatingCompanies() {
  const url = `/destinating-companies`;
  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, url);
    yield put(destinatingCompaniesLoaded(list));
  } catch (err) {
    yield put(loadDestinatingCompaniesError(err));
  }
}

/**
 * fectch collecting companies api
 */
export function* fetchDrivers() {
  const url = `/drivers`;
  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, url);
    yield put(driversLoaded(list));
  } catch (err) {
    yield put(loadDriversError(err));
  }
}

/**
 * fectch collecting companies api
 */
export function* fetchVehicles() {
  const url = `/vehicles`;
  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, url);
    yield put(vehiclesLoaded(list));
  } catch (err) {
    yield put(loadVehiclesError(err));
  }
}

export default function* watchOrders() {
  yield takeLatest(LOAD_ORDERS, fetchOrders);
  yield takeLatest(LOAD_CUSTOMERS, fetchCustomers);
  yield takeLatest(LOAD_WASTES, fetchWastes);
  yield takeLatest(SAVE_ORDER, postOrder);
  yield takeLatest(SAVE_ORDER_MANIFEST, postOrderManifest);
  yield takeLatest(SELECT_ORDER, fetchManifestOrder);
  yield takeLatest(LOAD_DESTINATING_COMPANIES, fetchDestinatingCompanies);
  yield takeLatest(LOAD_COLLECTING_COMPANIES, fetchCollectingCompanies);
  yield takeLatest(LOAD_DRIVERS, fetchDrivers);
  yield takeLatest(LOAD_VEHICLES, fetchVehicles);
}
