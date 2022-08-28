// Buy MB during presale
// Buy MB out presale
// Buy MB paying less
// Buy MB when cap is reach
// Check admin receives funds
// Check sender receives remaining funds
// Check counter

// Presale Mint correct
// Check NFT transferred
// Check MB counter dicreases
// Presale Mint before date should fail
// Regular Mint correct
// Check NFT transferred
// Regular Mint before date should fail
// Regular Mint with not enough payment should fail
// Mint when cap is reached should fail

const { assert } = require("chai")
const { ethers } = require("hardhat")
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const BigNumber = require('big-number') 

describe("NftStore", () => {
  
  let CollectionFactory, collectionFactory, NftStore, nftStore, MockPriceFeed, mockPriceFeed, MockVRF, mockVRF, Link, link
  let admin, owner, user
  let provider
  let prevOwnerBalance, currOwnerBalance
  let prevAdminBalance, currAdminBalance
  let prevUserBalance, currUserBalance
  let collectionAddress
  const subscriptionId = "1";
  const keyHash = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f"
  const _callbackGasLimit = "2000000"
  const _requestConfirmations = "3"
  const price = '30000000000'

  before(async() => {  
    [admin, owner, user] = await ethers.getSigners()
    provider = ethers.getDefaultProvider();
      
    MockPriceFeed = await ethers.getContractFactory("MockV3Aggregator")
    MockVRF = await ethers.getContractFactory("VRFCoordinatorV2Mock")
    Link = await ethers.getContractFactory("BasicToken");
    CollectionFactory = await ethers.getContractFactory("CollectionFactory")
    NftStore = await ethers.getContractFactory("NftStore")

    mockPriceFeed = await MockPriceFeed.deploy(8, price)
    mockVRF = await MockVRF.deploy(10, 10)
    await mockVRF.createSubscription()
		await mockVRF.fundSubscription(subscriptionId, "1000000000000000000000000000")
    link = await Link.deploy()
    collectionFactory = await CollectionFactory.deploy()
    nftStore = await NftStore.deploy(
      mockPriceFeed.address,
      collectionFactory.address,
      subscriptionId,
      mockVRF.address,
      link.address,
      keyHash,
      _callbackGasLimit,
      _requestConfirmations,
      admin.address
    )
    await mockVRF.addConsumer("1",nftStore.address)
    await collectionFactory.createNFTCollection(
      "name",
      "symbol",
      "baseURI",
      "imageURI",
      1670000000, // future date
      2,
      4,
      300, // 2 USD
      600, // 3 USD
      "description"
    )
  })

  describe("Deployment", () => {
    it('deploys successfully', async () => {
			const address = nftStore.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
      assert.equal(1, 1)
		})
  })

  describe("Mystery Box", () => {
    it('Buy Mystery Box', async () => {
      const collectionData = await collectionFactory.getAllCollectionData()
      collectionAddress = collectionData[0].collectionAddress
      const amount = BigNumber("10").pow("16").toString()
      console.log(amount)
      prevOwnerBalance = await owner.getBalance()
      prevAdminBalance = await admin.getBalance()
      prevUserBalance = await user.getBalance()
      await nftStore.connect(user).buyMysteryBox(collectionAddress, { value: (amount + 1) })
      const counter = await nftStore.mysteryBoxUserCounter(user.address, collectionAddress)
      assert.equal(counter, "1")
    })

    it('Reveals mystery box', async() => {
      await helpers.time.increase(70000000);
      await nftStore.connect(user).mint(collectionAddress);
      const counter = await nftStore.mysteryBoxUserCounter(user.address, collectionAddress)
      let requestId = await nftStore.s_requestId()
      let fulfillRandomWordsReceipt = await mockVRF.fulfillRandomWords(requestId, nftStore.address)
      assert.equal(counter, "0")
      receipt = await nftStore.getUserNfts(user.address)
      console.log(receipt)
    })

    // it('Admin received funds', async() => {
    //   currAdminBalance = await admin.getBalance()
    //   const amount = BigNumber("10").pow("16").toString()
    //   assert.equal(currAdminBalance, amount.toString())
    // })

    // it('User receives funds back', async() => {
    //   currUserBalance = await user.getBalance()
    //   assert.equal(currUserBalance, "1")
    // })

    // it('Reverts when paying insuficcient amount', async() => {
    //   const collectionAddress = await collectionFactory.collections(0)
    //   const insufficientAmount = 10 ** 15
    //   await expect(
    //     nftStore.connect(owner).buyMysteryBox(collectionAddress, { value: insufficientAmount }))
    //       .to.be.revertedWith("NftStore: the amount paid did not cover the price")
    // })
  })
})
