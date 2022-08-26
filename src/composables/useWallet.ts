import { ref, computed } from 'vue'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

import { NetworkEnum } from './network.enum'

const currentNetworkId = ref(0 as NetworkEnum)
const currentAccount = ref('')

const provider = computed(() => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum, 'any')
  } else {
    return new ethers.providers.InfuraProvider(
      Number(import.meta.env.VITE_DEFAULT_NETWORK_ID),
      import.meta.env.VITE_INFURA_PROJECT_ID
    )
  }
})

const isValidNetwork = computed(() => {
  return (
    currentNetworkId.value === NetworkEnum.POLYGON_TEST_NET
  )
})

async function connect() {
  if (provider.value instanceof Web3Provider) {
    await provider.value.send('eth_requestAccounts', [])
  } else {
    throw new Error('No Ethereum Provider detected.')
  }
}

async function getCurrentAccount() {
  if (provider.value instanceof Web3Provider) {
    const listAccounts = await provider.value.listAccounts()
    currentAccount.value = listAccounts[0]
  }
}

async function getCurrentNetwork() {
  const currentNetwork = await provider.value.getNetwork()
  currentNetworkId.value = currentNetwork.chainId
}

function setWindowEthereumAccountChangedListener() {
  window.ethereum.on('accountsChanged', () => {
    getCurrentAccount()
  })
}

function setWindowEthereumNetworkChangedListener() {
  window.ethereum.on('chainChanged', () => {
    getCurrentAccount()
    getCurrentNetwork()
  })
}

function setWindowEthereumListeners() {
  setWindowEthereumAccountChangedListener()
  setWindowEthereumNetworkChangedListener()
}

function removeWindowEthereumNetworkChangedListener() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.ethereum.removeListener('chainChanged', () => {})
}

function initializeWallet() {
  getCurrentAccount()
  getCurrentNetwork()

  if (window.ethereum) {
    setWindowEthereumListeners()
  }
}

function removeWindowEthereumAccountChangedListener() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.ethereum.removeListener('accountsChanged', () => {})
}

function removeWindowEthereumListeners() {
  removeWindowEthereumAccountChangedListener()
  removeWindowEthereumNetworkChangedListener()
}

function validateAddress(address: string) {
  if (ethers.utils.isAddress(address)) {
    return true
  }
  return false
}

export {
  currentAccount,
  currentNetworkId,
  isValidNetwork,
  provider,
  validateAddress,
  connect,
  getCurrentAccount,
  getCurrentNetwork,
  initializeWallet,
  removeWindowEthereumListeners
}