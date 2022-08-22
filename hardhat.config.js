require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
//require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  solidity: "0.8.9",
  paths: {
    sources: "./src/contracts",
    artifacts:  "./src/artifacts"
  },
  networks: {
    mumbai: {
      // url: https://matic-mumbai.chainstacklabs.com:8545/,
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [privateKeys]
    }
  //   bnb: {
  //     // url: https://matic-mumbai.chainstacklabs.com:8545/,
  //     url: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //     accounts: [privateKeys]
  //   },
  //   rinkeby: {
  //     // url: https://matic-mumbai.chainstacklabs.com:8545/,
  //     url: "https://eth-rinkeby.alchemyapi.io/v2/uDRuoitYcadGiI-VgWZSSTqYGHO6B4Ub",
  //     accounts: [privateKeys]
  //   }
  },
  etherscan: {
    apiKey: "2IWVY2824WC7VZ56UXH49FSPK5PPPZC7IG" // mumbai
    //apiKey: "6888TJRWBGYKFE8N16Q4BZZM2M1URVWM4F"// bnb 
    // apiKey: "AJ45C6F74SJ2P3EMW61V3DD1CJAJC3HTJK" // ethereum
  }
};
