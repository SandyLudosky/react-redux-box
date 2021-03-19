import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { setValue, getValue } from "../lib/actions/storage";
import "./App.css";

const App = ({ contract, storageValue, isLoading, set, get }) => {
  const inputRef = useRef();
  const [localValue, setLocalValue] = useState(null);

  const handleOnChange = (e) => setLocalValue(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!localValue) {
      return false;
    }
    set(localValue);
    inputRef.current.value = null;
  };

  useEffect(() => get(), [get]);

  return (
    <div className="App">
      <h2>Smart Contract Example with React &amp; Redux</h2>
      <p>
        {!!contract
          ? "Your contracts compiled and migrated successfully "
          : "Try to deploy your contract !"}
        {!!contract && <span>at address : {contract.options.address}</span>}
      </p>
      <hr />

      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <p>Try changing the value stored on your smart contract :</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="number"
          name="inputValue"
          defaultValue={localValue}
          onChange={handleOnChange}
          placeholder="enter value here"
          ref={inputRef}
        ></input>
        &nbsp;
        <button type="submit">Submit</button>
      </form>
      <p>
        The stored value is: {isLoading ? "data is loading..." : storageValue}
      </p>
    </div>
  );
};

const mapStateToProps = ({ storage, contract }) => {
  return {
    storageValue: storage.storageValue,
    isLoading: storage.isLoading,
    inputValue: storage.inputValue,
    contract: contract.instances.SimpleStorage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  set: (value) => dispatch(setValue(value)),
  get: () => dispatch(getValue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
