// Deploy check
// Create NFT Collection
// Check collection deployment
// UpdateCollection with wrong address
// UpdateCollection with right address
// Check array properly updated
// Check getters


const {
  time
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const assert = require('assert');
// const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers')

let owner, factory
colName = "First Collection Test",
colSymbol = "FCT",
colBaseURI = "testBaseURI",
colPresaleDate = "1666359708",
colPresaleCap = "10",
colFullCap = "20",
colPresalePrice = "2000",
colRegularPrice = "4000",
colOwnerRevert = "Not Collection Owner"

describe("Collection Factory", function () {
	before (async () => {
		[owner, secAccount] = await ethers.getSigners()
		const Factory = await ethers.getContractFactory("CollectionFactory");
		factory = await Factory.deploy()
	})

  describe("CollectionFactory Deployment", () => {
    it('Deploys successfully', async () => {
			const address = factory.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
		});
  })

  describe("Create NFT Collection", ()=> {
    it("NFt Collection Deployed correctly", async() => {
      recipe = await factory.createNFTCollection(
        colName,
        colSymbol,
        colBaseURI,
        colPresaleDate,
        colPresaleCap,
        colFullCap,
        colPresalePrice,
        colRegularPrice
              )
      firstCollectionAddress = await factory.collections(0)
      assert.notEqual(firstCollectionAddress, 0x0)
			assert.notEqual(firstCollectionAddress, '')
			assert.notEqual(firstCollectionAddress, null)
			assert.notEqual(firstCollectionAddress, undefined)

      firstCollection = await hre.ethers.getContractAt("NftCollection", firstCollectionAddress);
      const name = await firstCollection.name()
      assert.equal(colName, name.toString())
			const symbol = await firstCollection.symbol()
			assert.equal(colSymbol, symbol.toString())
    })

    it("CollectionCreated event is emitted", async()=> {
      const eventCreated = await recipe.wait()
      assert.equal(eventCreated.events[0].args[0].toString(),firstCollectionAddress.toString())
    })

    it("NFT Attributes are correct", async() => {
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.presaleDate.toString(), colPresaleDate)
      assert.equal(attributes.mysteryBoxCap.toString(), colPresaleCap)
      assert.equal(attributes.nftCap.toString(), colFullCap)
      assert.equal(attributes.availableNfts.toString(), "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19")
      assert.equal(attributes.owner, owner.address)
      assert.equal(attributes.mysteryBoxUsdPrice.toString(), colPresalePrice)
      assert.equal(attributes.nftUsdPrice.toString(), colRegularPrice)
      assert.equal(attributes.frozen.toString(), "false")
    })

  describe("Update Collection Parameters", () => {
    // Set NFTStore address to be able to updateCollection
    it("Set nftStoreAddress", async() => {
      await factory.setNftStoreAddress(owner.address)
      const nftStoreAddress = await factory.nftStoreAddress()
      assert.equal(nftStoreAddress, owner.address)
    })

    it("Update presaleDate with insufficient rights", async() => {
      await expect(
        factory.connect(secAccount).updatePresaleDate(firstCollectionAddress, 4132431242)
      ).to.be.revertedWith(colOwnerRevert)
    })

    it("Update presaleDate", async() => {
      await factory.updatePresaleDate(firstCollectionAddress, 4132431242)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.presaleDate.toString(), "4132431242")

    })

    it("Update available NFTs with wrong arguments", async() => {
      await expect(
        factory.connect(secAccount).updateCollection(firstCollectionAddress, 1)
      ).to.be.revertedWith("Only nftStore can update this")
    })

    it("Update available NFTs", async() => {
      await factory.updateCollection(firstCollectionAddress, 1)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.availableNfts.toString(), "0,19,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18")
    })

    it("updadateMysteryBoxPrice with insufficient rights", async() => {
      await expect(
        factory.connect(secAccount).updadateMysteryBoxPrice(firstCollectionAddress, 3414)
      ).to.be.revertedWith(colOwnerRevert)
    })

    it("updadateMysteryBoxPrice", async() => {
      await factory.updadateMysteryBoxPrice(firstCollectionAddress, 3414)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.mysteryBoxUsdPrice.toString(), "3414")      
    })

    it("updateNftPrice with insufficient rights", async() => {
      await expect(
        factory.connect(secAccount).updateNftPrice(firstCollectionAddress, 100)
      ).to.be.revertedWith(colOwnerRevert)
    })

    it("updateNftPrice", async() => {
      await factory.updateNftPrice(firstCollectionAddress, 100)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.nftUsdPrice.toString(), "100")
    })

    it("updateFrozenFlag with insufficient rights", async() => {
      await expect(
        factory.connect(secAccount).updateFrozenFlag(firstCollectionAddress)
      ).to.be.revertedWith(colOwnerRevert)
    })

    it("updateFrozenFlag", async() => {
      await factory.updateFrozenFlag(firstCollectionAddress)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.frozen.toString(), "true")
    })    

  })
})

// Deploy check
// Create NFT Collection
  // Check collection deployment
// UpdateCollection with wrong address
// UpdateCollection with right address
// Check array properly updated
// Check getters
})