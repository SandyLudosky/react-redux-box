const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", (accounts) => {
  let instance;
  before(async () => {
    instance = await SimpleStorage.new();
  });

  it("should deployed", () => {
    console.log(instance.address);
    assert(instance.address);
  });

  it("should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();
    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
