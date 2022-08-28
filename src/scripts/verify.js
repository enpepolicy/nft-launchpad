const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

function getAddress (networkId, contractName) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  return addressesJsonData[networkId][contractName]
}

async function main () {
    // await hre.run("verify:verify", {
    //     address: getAddress(process.env.NETWORK_ID, "collection-factory")
    // })
    await hre.run("verify:verify", {
        address: getAddress(process.env.NETWORK_ID, "nft-store"),
        constructorArguments: [
            "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
            getAddress(process.env.NETWORK_ID, "collection-factory"),
            1616,
            "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
            "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
            2500000,
            3,
            "0x2bE1B381396c44b905C1f3Cf586DCF9d7519Df1d"
          ],
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    });