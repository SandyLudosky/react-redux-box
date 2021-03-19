import getWeb3 from "./getWeb3";

const handleErrors = (err) => {
  throw Error(err);
};
const handleContractInstances = (contracts, web3, networkId) => {
  return contracts.reduce((acc, contract) => {
    const deployedNetwork = contract.networks[networkId];
    const instance = new web3.eth.Contract(
      contract.abi,
      deployedNetwork && deployedNetwork.address
    );
    return {
      ...acc,
      [contract.contractName]: instance,
    };
  }, {});
};
const connectWeb3 = new Promise(async (resolve) => {
  const web3 = await getWeb3();
  resolve(web3);
});
const connectBlockchain = (web3, contracts) =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const instances = handleContractInstances(contracts, web3, networkId);
      instances && console.log("connected to blockchain", instances);
      resolve({ web3, instances, accounts });
    } catch (err) {
      reject(err);
    }
  });

const createWeb3Middleware = (contract) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    connectWeb3
      .then((web3) => connectBlockchain(web3, contract), console.error)
      .then(({ web3, instances, accounts }) => {
        if (typeof action === "function") {
          return action(dispatch, getState, {
            web3,
            accounts,
            instances,
          });
        }
        return next(action);
      }, console.error);
  };
};

export default (contract) => createWeb3Middleware(contract);
