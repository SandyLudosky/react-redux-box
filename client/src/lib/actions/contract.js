import { DEPLOY } from "./types";

export const deploy = () => {
  return (dispatch, _, { instance, accounts }) => {
    console.log(instance);
    dispatch({
      type: DEPLOY,
      payload: { instance, accounts, admin: accounts[0] },
    });
  };
};
