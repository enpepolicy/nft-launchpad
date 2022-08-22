// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// Import this file to use console.log
import "hardhat/console.sol";

contract NftCollection is ERC721 {
  string baseURI;
  address nftStoreAddress;
  using Strings for uint;
  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    string memory _baseUri,
    address _nftStoreAddress
  )

    ERC721(_tokenName, _tokenSymbol)
  {    
    baseURI = _baseUri;
    nftStoreAddress = _nftStoreAddress;
  }

  // Override
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
  // Override
  function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function mint(uint _nftIndex, address _nftOwner) external {
    require(msg.sender == nftStoreAddress, "Only NftStore can mint");
    _safeMint(_nftOwner, _nftIndex);
  }

  function getTokenUri(uint _tokenId) external view returns(string memory) {
    return  string(abi.encodePacked(baseURI, "/", _tokenId, ".json"));
  }

  function _baseURI() internal override view virtual returns (string memory) {
    return baseURI;
  }
}


// Collection Factory Contract
contract CollectionFactory {

  address[] public collections;
  address public nftStoreAddress;
  struct Collections {
    uint presaleDate;
    uint16 mysteryBoxCap;
    uint16 nftCap;
    uint16[] availableNfts;
    address owner;
    uint mysteryBoxUsdPrice;
    uint nftUsdPrice;
    bool frozen;
    string coverImageUri;
    string tokenName;
  }

  mapping(address => Collections) collection;
  
  // Events
  event NFTCollectionCreated(address nftCollectionAddress, uint presaleDate, uint mysteryBoxCap, uint nftCap,
  uint16[] availableNFTs, address owner, uint mysteryBoxUsdPrice, uint nftUsdPrice, bool frozen);
  event AvailableNFtsUpdated(address nftCollectionAddress, uint nftIndex);

  function createNFTCollection(
    string memory _tokenName,
    string memory _tokenSymbol,
    string memory _baseUri,
    string memory _coverImageUri,
    uint _presaleDate,
    uint16 _mysteryBoxCap,
    uint16 _nftCap,
    uint _mysteryBoxUsdPrice,
    uint _nftUsdPrice
  ) external {

    // Initialize array to later on pick nft to mint
    uint16[] memory _availableNfts = new uint16[](_nftCap);
    for(uint16 i = 0; i < _nftCap; i++) {
      _availableNfts[i] = i;
    }
    NftCollection _collection = new NftCollection(
      _tokenName,
      _tokenSymbol,
      _baseUri,
      nftStoreAddress
    );

    collection[address(_collection)] = Collections(
      _presaleDate,
      _mysteryBoxCap,
      _nftCap,
      _availableNfts,
      msg.sender,
      _mysteryBoxUsdPrice,
      _nftUsdPrice,
      false,
      _coverImageUri,
      _tokenName
    );
    collections.push(address(_collection));
    emit NFTCollectionCreated(address(_collection), _presaleDate, _mysteryBoxCap, _nftCap,
    _availableNfts, msg.sender, _mysteryBoxUsdPrice, _nftUsdPrice, false);
  }

	/********************************************************
	*                                                       *
	*                      Getters                          *
	*                                                       *
	********************************************************/

  function getCollection(address _collection) external view returns(Collections memory) {
    return collection[_collection];
  }

  function getAllCollectionData(address[] memory _collection) external view returns(Collections[] memory) {
    Collections[] memory _collectionData = new Collections[](_collection.length);
    for(uint16 i = 0; i < _collection.length; i++ ) {
      _collectionData[i] = collection[_collection[i]];
    }
    return _collectionData;
  }

  function getCollectionArray() external view returns(address[] memory) {
    return collections;
  }

	/********************************************************
	*                                                       *
	*                      SETTERS                          *
	*                                                       *
	********************************************************/


  function setNftStoreAddress(address _nftStoreAddress) external {
    nftStoreAddress = _nftStoreAddress;
  }
  
  function updatePresaleDate(address _collectionAddress, uint _presaleDate) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].presaleDate = _presaleDate;
  }

  function updateAvailableNFts(address _nftCollection, uint16 _indexToDelete) external {
    require(msg.sender == nftStoreAddress, "Only nftStore can update this");
    uint16[] storage _availableNfts = collection[_nftCollection].availableNfts;
    _availableNfts[_indexToDelete] = _availableNfts[_availableNfts.length - 1];
    _availableNfts.pop();
    emit AvailableNFtsUpdated(_nftCollection, _indexToDelete);
  }

  function updadateMysteryBoxPrice(address _collectionAddress, uint _USDPrice) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].mysteryBoxUsdPrice = _USDPrice;
  }

  function updateNftPrice(address _collectionAddress, uint _USDPrice) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].nftUsdPrice = _USDPrice;
  }

  function updateFrozenFlag(address _collectionAddress) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].frozen = !collection[_collectionAddress].frozen;
  }

	/********************************************************
	*                                                       *
	*                     MODIFIERS                         *
	*                                                       *
	********************************************************/

	modifier collectionOwner(address _collectionAddress) {
		require(msg.sender == collection[_collectionAddress].owner, "Not Collection Owner");
		_;
	}
}

/*
1. CreateCollecton
2. NftStore
3. My MysteryBoxes
4. My NFTs

*/

