// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract NftCollection is ERC721 {  
  constructor(
    string memory tokenName,
    string memory tokenSymbol,
    uint presaleSupply,
    uint fullSupply,
    string memory baseUri
  )
    ERC721(tokenName, tokenSymbol)
  {    
    
  }
}

contract CollectionFactory {

  address[] public collections;
  struct Collections {
    uint presaleDate;
    uint mysteryBoxCap;
    uint nftCap;
  }

  mapping(address => Collections) collection;
  
  function create(
    string memory tokenName, 
    string memory tokenSymbol,
    uint presaleSupply,
    uint fullSupply,
    string memory baseUri
  ) external {
    NftCollection _collection = new NftCollection(
      tokenName,
      tokenSymbol,
      presaleSupply,
      fullSupply,
      baseUri
    );
    collections.push(address(_collection));
  }

  function getCollection(address _collection) external view returns(Collections memory) {
    return collection[_collection];
  }
}