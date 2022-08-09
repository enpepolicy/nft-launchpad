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
  }

  mapping(address => Collections) collection;
  
  function createNFTCollection(
    string memory _tokenName, 
    string memory _tokenSymbol,
    string memory _baseUri,
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
      _nftUsdPrice
    );
    collections.push(address(_collection));
  }

  function getCollection(address _collection) external view returns(Collections memory) {
    return collection[_collection];
  }

  function updateCollection(address _nftCollection, uint16 _indexToDelete) external {
    require(msg.sender == nftStoreAddress, "Only nftStore can update this");
    uint16[] storage _availableNfts = collection[_nftCollection].availableNfts;
    _availableNfts[_indexToDelete] = _availableNfts[_availableNfts.length - 1];
    _availableNfts.pop();
  }

}

/*
1. Factory
2. NftStore
*/