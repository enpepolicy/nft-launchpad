import { computed } from 'vue'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { currentAccount, provider, currentNetworkId } from '../useWallet'

import { abi } from '../../artifacts/src/contracts/CollectionFactory.sol/CollectionFactory.json'
import addressList from '../../contract-addresses.json'

const dynamicAddress = computed(() => {
  return addressList[currentNetworkId.value]
})

const Contract = computed(() => {
  return new ethers.Contract(
    dynamicAddress.value,
    abi,
    provider.value instanceof Web3Provider && currentAccount.value
      ? provider.value.getSigner()
      : provider.value
  )
})

async function getDetailedCollectionsByAddress (address: string) {
    return await Contract.value
        .getDetailedCollectionsByAddress(address)
}

// async function createEnvelope(
//   participantsLimit: number,
//   message: string,
//   creatorNickname: string,
//   tokenAmount: string,
// ) {
//   const transaction =  await Contract.value
//     .createEnvelope(
//       participantsLimit,
//       message,
//       creatorNickname,
//       { value: ethers.utils.parseEther(tokenAmount) }
//     )
      
//   return await transaction.wait().then(res => console.log(res));
// }

// async function participate(
//   envelopeId: string,
// ) {
//   const transaction =  await Contract.value
//     .claim(envelopeId)
      
//   return await transaction.wait().then(res => console.log(res));
// }

// async function getEnvelopeById(
//   envelopeId: string,
// ) {
//   return  await Contract.value
//     .getEnvelope(envelopeId)
// }

// async function getEnvelopesByAddress(
//   address: string,
// ) {
//   return  await Contract.value
//     .getCreatorEnvelopes(address)
// }

export {
    getDetailedCollectionsByAddress
//   createEnvelope,
//   getEnvelopeById,
//   participate,
//   getEnvelopesByAddress
}