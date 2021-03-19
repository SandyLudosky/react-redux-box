import { DEPLOY } from "./types";

export const deploy = () => {
  return (dispatch, _, { instances, accounts }) => {
    dispatch({
      type: DEPLOY,
      payload: { instances, accounts, admin: accounts[0] },
    });
  };
};
