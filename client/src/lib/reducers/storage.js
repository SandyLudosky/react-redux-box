import {
  SET_VALUE_ERROR,
  SET_VALUE_SUCCESS,
  SET_VALUE_PENDING,
  GET_VALUE_ERROR,
  GET_VALUE_SUCCESS,
  GET_VALUE_PENDING,
  DEPLOY,
} from "../actions/types";

export const initialState = {
  instance: null,
  storageValue: 0,
  isPending: false,
  event: null,
};

const storage = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return {
        ...state,
        instance: payload.storage.instance,
      };
    case SET_VALUE_PENDING:
      return {
        ...state,
        ...payload,
      };
    case GET_VALUE_PENDING:
      return {
        ...state,
        ...payload,
      };
    case GET_VALUE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case SET_VALUE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case SET_VALUE_ERROR:
      return {
        ...state,
        ...payload,
      };
    case GET_VALUE_ERROR:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default storage;
