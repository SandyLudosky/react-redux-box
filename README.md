# React Redux Box

<img src="./box-img-sm.png" alt="react-redux box image" title="react-redux_logo" width="300" />

This box comes with everything you need to start using smart contracts from a react app, plus and implementation  redux library for state management.

You will need to install Node.js and Truffle, as stated in the tutorial - see "Setting up the development environment".

## Features
- addon : web3 middleware to enhance the redux store with smart contracts' instances and handle async data flow
- the web3Middleware allows to connect to the blockchain first. then, dispatch actions

## Usage

1. Create a new directory and run :

```
truffle unbox SandyLudosky/react-redux-box
```

## After unboxing

run :

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

Now that you have successfully launched your Solidity contract onto your local blockchain, go into the client directory:

Run the project by entering the following:

```
npm start
```

To see your project in the browser, go to http://localhost:3000/

## Example :

#### store.js : include contracts abi in contracts' array in the contractsOptions
```jsx
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import web3Middleware from "../middlewares/web3Middleware";
import { SimpleStorage, Greetings } from "../../contracts";

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

const contracts = [SimpleStorage, Greetings] /* add contracts json here */

const middlewares = applyMiddleware(web3Middleware(contractOptions.contracts));
export default createStore(rootReducer, composeEnhancer(middlewares));

```

#### actions.js : get contracts instances before dispatching actions
```jsx
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

### For more projects: [Truffle box example with web3Middleware](https://github.com/SandyLudosky/Truffle-examples)


