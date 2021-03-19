import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { setValue, getValue } from "../lib/actions/storage";
import { readMessage } from "../lib/actions/greeting";
import "./App.css";

const App = ({
  contract,
  isStorageValueLoading,
  isGreetingMessagePending,
  storageValue,
  welcomeMessage,
  setValue,
  getValue,
  readMessage,
}) => {
  const inputRef = useRef();
  const [localValue, setLocalValue] = useState(null);

  const handleOnChange = (e) => setLocalValue(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!localValue) {
      return false;
    }
    setValue(localValue);
    inputRef.current.value = null;
  };

  useEffect(() => getValue(), [getValue]);
  useEffect(() => readMessage(), [getValue]);
  return (
    <div className="App" style={{ margin: "100px auto 0 auto", width: "60%" }}>
      <div style={{ marginBottom: 50, borderBottom: "1px solid #ccc" }}>
        <h1>
          {isGreetingMessagePending
            ? "Smart Contract Example with React &amp; Redux"
            : welcomeMessage}
        </h1>
        <p>
          {!!contract
            ? "Your contracts compiled and migrated successfully "
            : "Try to deploy your contract !"}
          {!!contract && (
            <>
              <br />
              <span>at address : {contract.options.address}</span>
            </>
          )}
        </p>
      </div>

      <div style={{ marginTop: 50 }}>
        <p>Try changing the value stored on your smart contract :</p>
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            name="inputValue"
            defaultValue={localValue}
            onChange={handleOnChange}
            placeholder="enter value here"
            ref={inputRef}
          />
          &nbsp;
          <button type="submit">Submit</button>
        </form>
        <p>
          The stored value is:{" "}
          {isStorageValueLoading ? "data is loading..." : storageValue}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ storage, contract, greeting }) => {
  return {
    storageValue: storage.storageValue,
    isStorageValueLoading: storage.isLoading,
    welcomeMessage: greeting.message,
    isGreetingMessagePending: greeting.isPending,
    contract: contract.instances?.SimpleStorage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setValue: (value) => dispatch(setValue(value)),
  getValue: () => dispatch(getValue()),
  readMessage: () => dispatch(readMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
