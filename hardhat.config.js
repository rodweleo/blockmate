/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./src/contracts",        
    artifacts: "./src/artifacts",          
    cache: "./src/cache",
    tests: "./src/test"
  }
};
