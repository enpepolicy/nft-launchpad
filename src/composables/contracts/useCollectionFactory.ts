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

async function getAllCollectionData () {
    return await Contract.value
        .getAllCollectionData()
}

async function createNFTCollection (payload: {
  _tokenName: string;
  _tokenDescription: string;
  _tokenSymbol: string;
  _baseUri: string;
  _coverImageUri: string;
  _presaleDate: number;
  _mysteryBoxCap: number | undefined;
  _nftCap: number | undefined;
  _mysteryBoxUsdPrice: number | undefined;
  _nftUsdPrice: number | undefined
}) {

  const {
    _tokenName,
    _tokenDescription,
    _tokenSymbol,
    _baseUri,
    _coverImageUri,
    _presaleDate,
    _mysteryBoxCap,
    _nftCap,
    _mysteryBoxUsdPrice,
    _nftUsdPrice
  } = payload;

  const transaction =  await Contract.value
    .createNFTCollection(
      _tokenName,
      _tokenSymbol,
      _baseUri,
      _coverImageUri,
      Math.trunc(_presaleDate / 1000),
      _mysteryBoxCap || 0,
      _nftCap || 0,
      _mysteryBoxUsdPrice ?_mysteryBoxUsdPrice * 100 : 0,
      _nftUsdPrice ? _nftUsdPrice * 100 : 0,
      _tokenDescription,
    )      

  return await transaction.wait().then(res => console.log(res));
}
      
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
  dynamicAddress,
  getAllCollectionData,
  getDetailedCollectionsByAddress,
  createNFTCollection
//   createEnvelope,
//   getEnvelopeById,
//   participate,
//   getEnvelopesByAddress
}