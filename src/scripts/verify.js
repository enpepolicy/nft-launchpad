const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

function getAddress (networkId = process.env.NETWORK_ID) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  return addressesJsonData[networkId]
}

async function main () {
    await hre.run("verify:verify", {
        address: getAddress()
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    });