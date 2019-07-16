import * as types from '../action/actionTypes';
import initialState from './initialState';

const actionTypeEndInSuccess = (type) => {
  return type.substring(type.length - 8) === '_SUCCESS';
};
const apiStatusReducer = (state = initialState.apiCallsInProgress, action) => {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type == types.API_CALL_ERROR ||
    actionTypeEndInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
};
export default apiStatusReducer;
