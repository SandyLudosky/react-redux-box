import { DEPLOY } from "../actions/types";

export const initialState = {
  accounts: [],
  admin: null,
};

const contracts = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPLOY:
      return {
        admin: payload.admin,
        accounts: payload.accounts,
      };
    default:
      return state;
  }
};
export default contracts;
