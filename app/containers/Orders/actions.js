import {
  LOAD_ORDERS,
  ORDERS_LOADED,
  LOAD_ORDERS_ERROR,
  SELECT_ORDER,
  ORDER_MANIFEST_LOADED,
  SAVE_ORDER,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_ERROR,
  SAVE_ORDER_MANIFEST,
  SAVE_ORDER_MANIFEST_SUCCESS,
  SAVE_ORDER_MANIFEST_ERROR,
  LOAD_CUSTOMERS,
  CUSTOMERS_LOADED,
  LOAD_CUSTOMERS_ERROR,
  LOAD_WASTES,
  WASTES_LOADED,
  LOAD_WASTES_ERROR,
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

export function loadCollectingCompanies() {
  return {
    type: LOAD_COLLECTING_COMPANIES,
  };
}

export function loadCollectingCompaniesError(error) {
  return {
    type: LOAD_COLLECTING_COMPANIES_ERROR,
    error,
  };
}

export function collectingCompaniesLoaded(collectingCompanies) {
  return {
    type: COLLECTING_COMPANIES_LOADED,
    collectingCompanies,
  };
}

export function loadDestinatingCompanies() {
  return {
    type: LOAD_DESTINATING_COMPANIES,
  };
}

export function loadDestinatingCompaniesError(error) {
  return {
    type: LOAD_DESTINATING_COMPANIES_ERROR,
    error,
  };
}

export function destinatingCompaniesLoaded(destinatingCompanies) {
  return {
    type: DESTINATING_COMPANIES_LOADED,
    destinatingCompanies,
  };
}

export function loadDrivers() {
  return {
    type: LOAD_DRIVERS,
  };
}

export function loadDriversError(error) {
  return {
    type: LOAD_DRIVERS_ERROR,
    error,
  };
}

export function driversLoaded(drivers) {
  return {
    type: DRIVERS_LOADED,
    drivers,
  };
}

export function loadVehicles() {
  return {
    type: LOAD_VEHICLES,
  };
}

export function loadVehiclesError(error) {
  return {
    type: LOAD_VEHICLES_ERROR,
    error,
  };
}

export function vehiclesLoaded(vehicles) {
  return {
    type: VEHICLES_LOADED,
    vehicles,
  };
}

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

export function saveOrder(order) {
  return {
    type: SAVE_ORDER,
    order,
  };
}

export function selectOrder(order) {
  return {
    type: SELECT_ORDER,
    order,
  };
}

export function orderManifestLoaded(manifest) {
  return {
    type: ORDER_MANIFEST_LOADED,
    manifest,
  };
}

export function orderSaved(order) {
  return {
    type: SAVE_ORDER_SUCCESS,
    order,
  };
}

export function orderSavedError(error) {
  return {
    type: SAVE_ORDER_ERROR,
    error,
  };
}

export function saveOrderManifest(orderId, manifest) {
  return {
    type: SAVE_ORDER_MANIFEST,
    orderId,
    manifest,
  };
}

export function orderManifestSaved(manifest) {
  return {
    type: SAVE_ORDER_MANIFEST_SUCCESS,
    manifest,
  };
}

export function orderManifestSavedError(error) {
  return {
    type: SAVE_ORDER_MANIFEST_ERROR,
    error,
  };
}

export function loadCustomers() {
  return {
    type: LOAD_CUSTOMERS,
  };
}

export function customersLoaded(customers) {
  return {
    type: CUSTOMERS_LOADED,
    customers,
  };
}

export function loadCustomersError(error) {
  return {
    type: LOAD_CUSTOMERS_ERROR,
    error,
  };
}

export function loadWastes() {
  return {
    type: LOAD_WASTES,
  };
}

export function loadWastesError(error) {
  return {
    type: LOAD_WASTES_ERROR,
    error,
  };
}

export function wastesLoaded(wastes) {
  return {
    type: WASTES_LOADED,
    wastes,
  };
}
