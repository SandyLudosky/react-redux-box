import { DEPLOY } from "../actions/types";

export const initialState = {
  instances: null,
  accounts: [],
  admin: null,
};

const contracts = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return { ...payload };
    default:
      return state;
  }
};
export default contracts;
