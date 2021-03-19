import {
  WRITE_MESSAGE_PENDING,
  WRITE_MESSAGE_SUCCESS,
  WRITE_MESSAGE_ERROR,
  READ_MESSAGE_PENDING,
  READ_MESSAGE_SUCCESS,
  READ_MESSAGE_ERROR,
  DEPLOY,
} from "../actions/types";

export const initialState = {
  instance: null,
  isPending: false,
  message: null,
  error: null,
};

const greetings = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return {
        ...state,
        instance: payload.greetings.instance,
      };
    case WRITE_MESSAGE_PENDING:
      return {
        ...state,
        ...payload,
      };
    case WRITE_MESSAGE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case WRITE_MESSAGE_ERROR:
      return {
        ...state,
        ...payload,
      };
    case READ_MESSAGE_PENDING:
      return {
        ...state,
        ...payload,
      };
    case READ_MESSAGE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case READ_MESSAGE_ERROR:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default greetings;
