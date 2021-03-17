import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import web3Provider from "../middlewares/web3Provider";
import SimpleStorage from "../../contracts/SimpleStorage.json";

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(web3Provider(SimpleStorage)))
);
console.log(store);
export default store;
