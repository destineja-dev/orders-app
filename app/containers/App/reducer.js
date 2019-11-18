import { fromJS } from 'immutable';
import { REGISTER_SOCKET_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SOCKET_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
