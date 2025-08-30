const HydrogenCredit = artifacts.require("HydrogenCredit");

module.exports = function (deployer) {
  deployer.deploy(HydrogenCredit);
};
