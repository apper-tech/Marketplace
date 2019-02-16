const landContract = artifacts.require("landContract");


module.exports = function(deployer) {
  
  deployer.deploy(landContract);
};
