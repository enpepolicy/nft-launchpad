require('dotenv').config();

// const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" //match any network id
    },
  //   testnet: {
  //     networkCheckTimeout: 100000,
  //     provider: function() {
  //       return new HDWalletProvider(
  //         privateKeys.split(','), // array of private keys
  //         `https://data-seed-prebsc-1-s1.binance.org:8545/` // Url to an Ethereum node
  //         )
  //     },
  //     network_id: 97,
  //     confirmations: 10,
  //     timeoutBlocks: 200,
  //     skipDryRun: true,
  //     gas: 2000000,
  //     gasPrice: 20000000000
  //   }
   },
   contracts_directory: './src/contracts/',
   contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.8.4"
    }
  }

};