// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const { ethers } = require("hardhat");


function getAddress (networkId, contractName) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  return addressesJsonData[networkId][contractName]
}

function setAddress (networkId, contractName, contractAddress) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  console.log(networkId, contractName, contractAddress)
  addressesJsonData[networkId][contractName] = contractAddress
  
  // Updates file
  fs.writeFileSync(
    addressPath,
    JSON.stringify(addressesJsonData)
  )
}

async function main() {
  const Factory = await ethers.getContractFactory("CollectionFactory");
  
  let factory = await Factory.deploy()
  await factory.deployed();

  console.log("CollectionFactory: ", factory.address);
  setAddress(process.env.NETWORK_ID, 'collection-factory', factory.address)

  const NftStore = await ethers.getContractFactory("NftStore")  
  let nftStore = await NftStore.deploy(
    "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
    factory.address,
    // getAddress(process.env.NETWORK_ID, "collection-factory"),
    1616,
    "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
    "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
    2500000,
    3,
    "0x2bE1B381396c44b905C1f3Cf586DCF9d7519Df1d"
  )
  console.log("NftStore", nftStore.address)
  setAddress(process.env.NETWORK_ID, 'nft-store', nftStore.address)
  await factory.setNftStoreAddress(nftStore.address)
  await factory.createNFTCollection(
    "First Test Collection", 
    "FTC",
    "QmTf1GaD7j9FYZzo9RUSUkHB9oLkNAZrFQB1aPrsGzWn1d",
    "QmTuxXq8GWWdFbji3nG3oHfL92nPwkdicvvfps7aSx6BJE/1.png",
    "1661601866",
    "3",
    "9",
    "1",
    "1",
    "NFT Collection supporting Energy System NGO"
  );
}
// string memory _tokenName,
// string memory _tokenSymbol,
// string memory _baseUri,
// string memory _coverImageUri,
// uint _presaleDate,
// uint16 _mysteryBoxCap,
// uint16 _nftCap,
// uint _mysteryBoxUsdPrice,
// uint _nftUsdPrice,
// string memory _tokenDescription



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});