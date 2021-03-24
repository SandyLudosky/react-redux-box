# React Redux Truffle Box (web3 middleware)

![](https://byob.yarr.is/SandyLudosky/react-redux-box/time)
![](https://byob.yarr.is/SandyLudosky/react-redux-box/Coverage)


<img src="./box-img-sm.png" alt="react-redux box image" title="react-redux_logo" width="300" />

> This box comes with everything you need to get started with building large-scale decentralized applications. The box includes a truffle project, a react client app with redux to manage state along with the redux devTools to help debug. Checkout projects examples [here](https://github.com/SandyLudosky/Truffle-examples).

## Features
  - addon : web3 middleware to enhance the redux store with smart contracts' instances and handle async data flow. The web3Middleware allows to connect to the blockchain first. then, dispatch actions
  - you can complete the `.env` file in the root folder to set environment variables. This file will be ignored by git, so it is suitable for API keys (such as [Infura](https://infura.io/) secrets) and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) documentation for more details.

## Usage

1. Create a new directory and run :

```
truffle unbox SandyLudosky/react-redux-box
```

## After unboxing

to install all req'd dependencies both in the root and client projects, you can run :

```
npm run install-pkg 
```

In the main project directory:

```
truffle develop
```

Then, in the Truffle developer console:

```
compile
```

and then:

```
migrate
```

To test your smart contract(s), in truffle's developer console:

```
test
```

Now that you have successfully launched your Solidity contract onto your local blockchain, run

```
npm start
```

To see your project in the browser, go to http://localhost:3000/

## Usage Example :

#### `client/src/lib/store.js` : include contracts abi in contracts' array in the contractsOptions

```jsx
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import web3Middleware from "../middlewares/web3Middleware";
import { SimpleStorage } from "../../contracts";  /* import compiled contracts' json here */

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

const contracts = [SimpleStorage] /* add contracts json here in array */

const middlewares = applyMiddleware(web3Middleware(contracts)); /* pass array as param in the web3Middleware  */
export default createStore(rootReducer, composeEnhancer(middlewares));

```

#### `client/src/lib/actions.js` : get contracts instances before dispatching actions

```jsx
 /* get contracts' instance, then dispatch actions  */
export const setValue = (value) => {
  return (dispatch, _, { instances: { SimpleStorage }, admin }) => {  
    dispatch(setValuePending());
    SimpleStorage.methods
      .set(value)
      .send({ from: admin })
      .then((result) => {
        dispatch(setValueSuccess(!result.status));
        dispatch(getValue());
      })
      .catch(setValueError);
  };
};

```



