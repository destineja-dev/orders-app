import { REGISTER_SOCKET, REGISTER_SOCKET_ERROR } from './constants';

/**
 * Register socket
 *
 */
export function registerSocket() {
  return {
    type: REGISTER_SOCKET,
  };
}

/**
 * Register socket
 *
 */
export function registerSocketError(error) {
  return {
    type: REGISTER_SOCKET_ERROR,
    error,
  };
}
