require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d`,
    //   //accounts: [process.env.privateKey]
    // },
    // matic: {
    //   url: "https://polygon-mainnet.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d",
    //   //accounts: [process.env.privateKey]
    // },
    // goerli: {
    //   url: process.env.REACT_APP_ALCHEMY_API_URL,
    //   accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
    // }
    // sepolia: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/W_5ADThqxURpYEno3-EwVEryBKpcBI3u",
    //   accounts: [ "617b3a54b31c99f3a84b8e2de7211df554bd9e00ba193f2154c49466869bfbec" ]
    // }
    // sepolia: {
    //   url: "https://linea-sepolia.infura.io/v3/4c12c9f14b2048c5b5b421161055bcfd",
    //   accounts: [ "617b3a54b31c99f3a84b8e2de7211df554bd9e00ba193f2154c49466869bfbec" ]
    // }
    lineaTestnet: {
      url: "https://linea-testnet.infura.io/v3/4c12c9f14b2048c5b5b421161055bcfd",
      accounts: [ "617b3a54b31c99f3a84b8e2de7211df554bd9e00ba193f2154c49466869bfbec" ]
      // url: process.env.REACT_APP_ALCHEMY_API_URL,
      // accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
    }

  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};