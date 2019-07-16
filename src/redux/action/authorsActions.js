import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { apiCallStatus, apiCallError } from './apiStatusActions';

export const loadAuthorsSuccess = (authors) => {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

export const loadAuthors = () => (dispatch, getState) => {
  dispatch(apiCallStatus());
  return authorApi
    .getAuthors()
    .then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};
