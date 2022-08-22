// Deploy check
// Buy MB during presale
// Buy MB out presale
// Buy MB paying less
// Buy MB when cap is reach
// Check owner receives funcs
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

const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("NftStore", () => {
  
  let CollectionFactory, collectionFactory, NftStore, nftStore, MockPriceFeed, mockPriceFeed, MockPriceVRF, mockPriceVRF, Link, link;
  let admin, owner, user;
  const subscriptionId = "1";
  const _vrfCoordinator = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
  const keyHash = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
  const _callbackGasLimit = "2000000";
  const _requestConfirmations = "3";
  const price = '30000000000';


  before(async() => {    
    [admin, owner, user] = await ethers.getSigners();
    
    MockPriceFeed = await ethers.getContractFactory("MockAggregator");
    MockPriceVRF = await ethers.getContractFactory("VRFCoordinatorV2Mock");
    Link = await ethers.getContractFactory("BasicToken");
    CollectionFactory = await ethers.getContractFactory("CollectionFactory")
    NftStore = await ethers.getContractFactory("NftStore");

    mockPriceFeed = await MockPriceFeed.deploy();
    mockPriceVRF = await MockPriceVRF.deploy(10, 10);
    await mockPriceVRF.createSubscription();
		await mockPriceVRF.fundSubscription(subscriptionId, "10000000000000000000000000");
    link = await Link.deploy();
    collectionFactory = await CollectionFactory.deploy();
    nftStore = await NftStore.deploy(
      mockPriceFeed.address,
      collectionFactory.address,
      _vrfCoordinator,
      link.address,
      keyHash,
      _callbackGasLimit,
      _requestConfirmations,
      admin
    );    
  })



  describe("Deployment", function () {
    it('deploys successfully', async () => {
			const address = nftStore.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
      assert.equal(1, 1)
		});

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
   });
});
