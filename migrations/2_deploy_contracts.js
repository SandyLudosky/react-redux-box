var SimpleStorage = artifacts.require("SimpleStorage");
var Greeting = artifacts.require("Greeting");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Greeting, "Welcome to the Truffle box: react & redux");
};
