import { put, takeLatest } from 'redux-saga/effects';
// import { registerSocketError } from './actions';
// import { REGISTER_SOCKET } from './constants';

// export function* registerSocket() {
//   const socket = new HubConnectionBuilder()
//     .withUrl(`http://localhost:5001/hubs/jobs`)
//     .build();

//   try {
//     yield socket.start();
//   } catch (err) {
//     yield put(registerSocketError(err));
//   }
//   return socket;
// }

export default function* watchRegisterSocket() {
  // yield takeLatest(REGISTER_SOCKET, registerSocket);
}
