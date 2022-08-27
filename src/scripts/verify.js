const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

function getAddress (contractName) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  return addressesJsonData[contractName]
}

async function main () {
    await hre.run("verify:verify", {
        address: getAddress("CollectionFactory")
    })
    await hre.run("verify:verify", {
        address: getAddress("NftStore")
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    });