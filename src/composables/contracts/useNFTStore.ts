import { computed } from 'vue'
import { ethers, utils } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { currentAccount, provider, currentNetworkId } from '../useWallet'

import { abi as collectionABI } from '../../artifacts/src/contracts/NftCollectionABI.sol/NftCollection.json'
import { abi } from '../../artifacts/src/contracts/NftStore.sol/NftStore.json'
import addressList from '../../contract-addresses.json'

const dynamicAddress = computed(() => {
  return addressList[currentNetworkId.value]['nft-store']
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

async function getTokenAmount (usdQuantity: number) {
    return await Contract.value
        .getTokenAmount(usdQuantity)
}

async function mintByCollection (collectionAddress: string, price: string) {  
  const transaction = await Contract.value
    .mint(collectionAddress, { value: utils.parseEther(utils.formatEther(price)) })
  
  return await transaction.wait();
}

async function buyMysteryBoxByCollection (collectionAddress: string, price: string) {
  const transaction = await Contract.value
    .buyMysteryBox( collectionAddress, { value: utils.parseEther(utils.formatEther(price)) })

  return await transaction.wait();
}

async function getUserMysteryBoxes (address: string) {
  return await Contract.value
    .getUserMysteryBoxes(address)
}

async function getUserNfts (address: string) {
  return await Contract.value
    .getUserNfts(address)
}

async function getTokenUriByAddressAndId (contractAddress: string, id: number ){
  const contract = new ethers.Contract(
    contractAddress,
    collectionABI,
    provider.value
  )

  return await contract
    .tokenURI(id)
    .then(res => console.log(res))
}

export {
  mintByCollection,
  buyMysteryBoxByCollection,
  getTokenAmount,
  getUserMysteryBoxes,
  getUserNfts,
  getTokenUriByAddressAndId
}