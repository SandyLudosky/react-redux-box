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
  instances: null,
  accounts: [],
  admin: null,
};

const storage = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return { ...payload };
    default:
      return state;
  }
};

export default storage;
