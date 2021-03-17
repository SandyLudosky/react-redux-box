import SimpleStorage from "../../contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

const connectWeb3 = new Promise(async (resolve) => {
  const web3 = await getWeb3();
  resolve(web3);
});

const connectBlockchain = (web3) =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];

      const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address
      );
      instance && console.log("connected to blockchain");
      resolve({ web3, instance, accounts });
    } catch (err) {
      reject(err);
    }
  });

function createWeb3Middleware(withExtraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    connectWeb3
      .then(connectBlockchain, console.error)
      .then(({ web3, instance, accounts }) => {
        if (typeof action === "function") {
          return action(dispatch, getState, {
            web3,
            accounts,
            instance,
          });
        }
        return next(action);
      });
  };
}
const web3Provider = createWeb3Middleware();
// web3Provider.withExtraArgument = createWeb3Middleware;
export default web3Provider;
