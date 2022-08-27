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
const { ethers, waffle } = require("hardhat")

describe("NftStore", () => {
  
  let CollectionFactory, collectionFactory, NftStore, nftStore, MockPriceFeed, mockPriceFeed, MockPriceVRF, mockPriceVRF, Link, link
  let admin, owner, user
  let provider = waffle.provider
  const subscriptionId = "1";
  const _vrfCoordinator = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed"
  const keyHash = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f"
  const _callbackGasLimit = "2000000"
  const _requestConfirmations = "3"
  const price = '30000000000'


  before(async() => {    
    [admin, owner, user] = await ethers.getSigners()
    
    MockPriceFeed = await ethers.getContractFactory("MockV3Aggregator")
    MockPriceVRF = await ethers.getContractFactory("VRFCoordinatorV2Mock")
    Link = await ethers.getContractFactory("BasicToken");
    CollectionFactory = await ethers.getContractFactory("CollectionFactory")
    NftStore = await ethers.getContractFactory("NftStore")

    mockPriceFeed = await MockPriceFeed.deploy(8, price)
    mockPriceVRF = await MockPriceVRF.deploy(10, 10)
    await mockPriceVRF.createSubscription()
		await mockPriceVRF.fundSubscription(subscriptionId, "10000000000000000000000000")
    link = await Link.deploy()
    collectionFactory = await CollectionFactory.deploy()
    nftStore = await NftStore.deploy(
      mockPriceFeed.address,
      collectionFactory.address,
      subscriptionId,
      _vrfCoordinator,
      link.address,
      keyHash,
      _callbackGasLimit,
      _requestConfirmations,
      admin.address
    )
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
      const collectionAddress = await collectionFactory.collections(0)
      const amount = 10 ** 16
      await nftStore.connect(owner).buyMysteryBox(collectionAddress, { value: (amount + 1) })
      const counter = await nftStore.mysteryBoxUserCounter(owner.address, collectionAddress)
      assert.equal(counter, "1")
    })

    it('Admin received funds', async() => {
      const adminBalance = provider.getBalance(admin.address)
      assert.equal(adminBalance, amount.toString())
    })

    it('User receives funds back', async() => {
      const userBalance = provider.getBalance(owner.address)
      assert.equal(userBalance, "1")
    })

    it('Reverts when paying insuficcient amount', async() => {
      const collectionAddress = await collectionFactory.collections(0)
      const insufficientAmount = 10 ** 15
      await expect(
        nftStore.connect(owner).buyMysteryBox(collectionAddress, { value: insufficientAmount }))
          .to.be.revertedWith("NftStore: the amount paid did not cover the price")
    })
  })
})
