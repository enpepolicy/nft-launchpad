// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract NftCollection is ERC721 {
  string baseURI;
  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    string memory _baseUri
  )

    ERC721(_tokenName, _tokenSymbol)
  {    
    baseURI = _baseUri;
  }

  // Override
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
  // Override
  function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}

contract CollectionFactory {

  address[] public collections;

  struct Collections {
    uint presaleDate;
    uint16 mysteryBoxCap;
    uint16 nftCap;
    uint16[] availableNfts;
    address owner;
  }

  mapping(address => Collections) collection;
  
  function create(
    string memory _tokenName, 
    string memory _tokenSymbol,
    uint _presaleDate,
    uint16 _mysteryBoxCap,
    uint16 _nftCap,
    string memory _baseUri
  ) external {

    // Initialize array to later on pick nft to mint
    uint16[] memory _availableNfts = new uint16[](_nftCap);
    for(uint16 i = 0; i < _nftCap; i++) {
      _availableNfts[i] = i;
    }
    NftCollection _collection = new NftCollection(
      _tokenName,
      _tokenSymbol,
      _baseUri
    );

    collection[address(_collection)] = Collections(
      _presaleDate,
      _mysteryBoxCap,
      _nftCap,
      _availableNfts,
      msg.sender
    );
    collections.push(address(_collection));
  }

  function getCollection(address _collection) external view returns(Collections memory) {
    return collection[_collection];
  }

  function updateCollection(address _nftCollection, uint16 _indexToDelete) external {
    // TODO: require to only minter
    uint16[] storage _availableNfts = collection[_nftCollection].availableNfts;
    _availableNfts[_indexToDelete] = _availableNfts[_availableNfts.length - 1];
    _availableNfts.pop();
  }

}

/*
1. Factory
2. NftStore
*/