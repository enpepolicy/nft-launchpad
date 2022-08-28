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

let owner, factory, firstCollection
colName = "First Collection Test",
colSymbol = "FCT",
colBaseURI = "testBaseURI",
colCoverImageUri = "testCoverURI",
colPresaleDate = "1666359708",
colPresaleCap = "10",
colFullCap = "20",
colPresalePrice = "2000",
colRegularPrice = "4000",

colName2 = "Second Collection Test",
colSymbol2 = "SCT",
colBaseURI2 = "Second testBaseURI",
colCoverImageUri2 = "Second testCoverURI",
colPresaleDate2 = "4134",
colPresaleCap2 = "2",
colFullCap2 = "5",
colPresalePrice2 = "100",
colRegularPrice2 = "200",
colOwnerRevert = "Not Collection Owner";


describe("Collection Factory", function () {
	before (async () => {
		[owner, secAccount] = await ethers.getSigners()
		const Factory = await ethers.getContractFactory("CollectionFactory");
		factory = await Factory.deploy()
    await factory.setNftStoreAddress(owner.address)
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
        colCoverImageUri,
        colPresaleDate,
        colPresaleCap,
        colFullCap,
        colPresalePrice,
        colRegularPrice,
        "fadsfads"
              );
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



    it("All NFT Collection Attributes are correct", async() => {
      await factory.createNFTCollection(
        colName2,
        colSymbol2,
        colBaseURI2,
        colCoverImageUri2,
        colPresaleDate2,
        colPresaleCap2,
        colFullCap2,
        colPresalePrice2,
        colRegularPrice2,
        "refads"
              )
      const fullCollection = await factory.getAllCollectionData()
      // attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(fullCollection[0].presaleDate.toString(), colPresaleDate)
      assert.equal(fullCollection[0].mysteryBoxCap.toString(), colPresaleCap)
      assert.equal(fullCollection[0].nftCap.toString(), colFullCap)
      assert.equal(fullCollection[0].availableNfts.toString(), "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19")
      assert.equal(fullCollection[0].owner, owner.address)
      assert.equal(fullCollection[0].mysteryBoxUsdPrice.toString(), colPresalePrice)
      assert.equal(fullCollection[0].nftUsdPrice.toString(), colRegularPrice)
      assert.equal(fullCollection[0].frozen.toString(), "false")
      assert.equal(fullCollection[0].coverImageUri.toString(), colCoverImageUri)
      assert.equal(fullCollection[0].tokenName.toString(), colName)

      assert.equal(fullCollection[1].presaleDate.toString(), colPresaleDate2)
      assert.equal(fullCollection[1].mysteryBoxCap.toString(), colPresaleCap2)
      assert.equal(fullCollection[1].nftCap.toString(), colFullCap2)
      assert.equal(fullCollection[1].availableNfts.toString(), "0,1,2,3,4")
      assert.equal(fullCollection[1].owner, owner.address)
      assert.equal(fullCollection[1].mysteryBoxUsdPrice.toString(), colPresalePrice2)
      assert.equal(fullCollection[1].nftUsdPrice.toString(), colRegularPrice2)
      assert.equal(fullCollection[1].frozen.toString(), "false")
      assert.equal(fullCollection[1].coverImageUri.toString(), colCoverImageUri2)
      assert.equal(fullCollection[1].tokenName.toString(), colName2)
    })

    it("Update available NFTs", async() => {
      await factory.updateAvailableNFts(firstCollectionAddress, owner.address, 1)
      attributes = await factory.getCollection(firstCollectionAddress)
      assert.equal(attributes.availableNfts.toString(), "0,19,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18")
      const uri = await firstCollection.tokenURI("1");
      console.log(uri.toString())
    })

    // it("My NFT Collection Attributes are correct", async() => {    
    //   const fullCollection = await factory.getMyCollectionData()
    //   // attributes = await factory.getCollection(firstCollectionAddress)
    //   assert.equal(fullCollection[0].presaleDate.toString(), colPresaleDate)
    //   assert.equal(fullCollection[0].mysteryBoxCap.toString(), colPresaleCap)
    //   assert.equal(fullCollection[0].nftCap.toString(), colFullCap)
    //   assert.equal(fullCollection[0].availableNfts.toString(), "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19")
    //   assert.equal(fullCollection[0].owner, owner.address)
    //   assert.equal(fullCollection[0].mysteryBoxUsdPrice.toString(), colPresalePrice)
    //   assert.equal(fullCollection[0].nftUsdPrice.toString(), colRegularPrice)
    //   assert.equal(fullCollection[0].frozen.toString(), "false")
    //   assert.equal(fullCollection[0].coverImageUri.toString(), colCoverImageUri)
    //   assert.equal(fullCollection[0].tokenName.toString(), colName)

    //   assert.equal(fullCollection[1].presaleDate.toString(), colPresaleDate2)
    //   assert.equal(fullCollection[1].mysteryBoxCap.toString(), colPresaleCap2)
    //   assert.equal(fullCollection[1].nftCap.toString(), colFullCap2)
    //   assert.equal(fullCollection[1].availableNfts.toString(), "0,1,2,3,4")
    //   assert.equal(fullCollection[1].owner, owner.address)
    //   assert.equal(fullCollection[1].mysteryBoxUsdPrice.toString(), colPresalePrice2)
    //   assert.equal(fullCollection[1].nftUsdPrice.toString(), colRegularPrice2)
    //   assert.equal(fullCollection[1].frozen.toString(), "false")
    //   assert.equal(fullCollection[1].coverImageUri.toString(), colCoverImageUri2)
    //   assert.equal(fullCollection[1].tokenName.toString(), colName2)
    // })

  // describe("Update Collection Parameters", () => {
  //   // Set NFTStore address to be able to updateCollection
  //   it("Set nftStoreAddress", async() => {
  //     await factory.setNftStoreAddress(owner.address)
  //     const nftStoreAddress = await factory.nftStoreAddress()
  //     assert.equal(nftStoreAddress, owner.address)
  //   })

  //   it("Update presaleDate with insufficient rights", async() => {
  //     await expect(
  //       factory.connect(secAccount).updatePresaleDate(firstCollectionAddress, 4132431242)
  //     ).to.be.revertedWith(colOwnerRevert)
  //   })

  //   it("Update presaleDate", async() => {
  //     await factory.updatePresaleDate(firstCollectionAddress, 4132431242)
  //     attributes = await factory.getCollection(firstCollectionAddress)
  //     assert.equal(attributes.presaleDate.toString(), "4132431242")

  //   })

  //   it("Update available NFTs with wrong arguments", async() => {
  //     await expect(
  //       factory.connect(secAccount).updateAvailableNFts(firstCollectionAddress, 1)
  //     ).to.be.revertedWith("Only nftStore can update this")
  //   })

  //   it("Update available NFTs", async() => {
  //     await factory.updateAvailableNFts(firstCollectionAddress, 1)
  //     attributes = await factory.getCollection(firstCollectionAddress)
  //     assert.equal(attributes.availableNfts.toString(), "0,19,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18")
  //   })

  //   it("updadateMysteryBoxPrice with insufficient rights", async() => {
  //     await expect(
  //       factory.connect(secAccount).updadateMysteryBoxPrice(firstCollectionAddress, 3414)
  //     ).to.be.revertedWith(colOwnerRevert)
  //   })

  //   it("updadateMysteryBoxPrice", async() => {
  //     await factory.updadateMysteryBoxPrice(firstCollectionAddress, 3414)
  //     attributes = await factory.getCollection(firstCollectionAddress)
  //     assert.equal(attributes.mysteryBoxUsdPrice.toString(), "3414")      
  //   })

  //   it("updateNftPrice with insufficient rights", async() => {
  //     await expect(
  //       factory.connect(secAccount).updateNftPrice(firstCollectionAddress, 100)
  //     ).to.be.revertedWith(colOwnerRevert)
  //   })

  //   it("updateNftPrice", async() => {
  //     await factory.updateNftPrice(firstCollectionAddress, 100)
  //     attributes = await factory.getCollection(firstCollectionAddress)
  //     assert.equal(attributes.nftUsdPrice.toString(), "100")
  //   })

  //   it("updateFrozenFlag with insufficient rights", async() => {
  //     await expect(
  //       factory.connect(secAccount).updateFrozenFlag(firstCollectionAddress)
  //     ).to.be.revertedWith(colOwnerRevert)
  //   })

  //   it("updateFrozenFlag", async() => {
  //     await factory.updateFrozenFlag(firstCollectionAddress)
  //     attributes = await factory.getCollection(firstCollectionAddress)
  //     assert.equal(attributes.frozen.toString(), "true")
  //   })    

  // })
})

// Deploy check
// Create NFT Collection
  // Check collection deployment
// UpdateCollection with wrong address
// UpdateCollection with right address
// Check array properly updated
// Check getters
})