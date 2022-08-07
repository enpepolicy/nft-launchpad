// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract NftCollection is ERC721 {  
  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint _presaleDate,
    uint _mysteryBoxCap,
    uint _nftCap,
    uint _mysteryBoxUsdPrice,
    uint _nftUsdPrice,
    string memory _baseUri
  )

    ERC721(_tokenName, _tokenSymbol)
  {    
    
  }
}

contract CollectionFactory {

  address[] public collections;
  struct Collections {
    uint presaleDate;
    uint mysteryBoxCap;
    uint nftCap;
    address owner;
    uint mysteryBoxUsdPrice;
    uint nftUsdPrice;
  }

  mapping(address => Collections) collection;
  
  function create(
    string memory _tokenName, 
    string memory _tokenSymbol,
    uint _presaleDate,
    uint _mysteryBoxCap,
    uint _nftCap,
    uint _mysteryBoxUsdPrice,
    uint _nftUsdPrice,
    string memory _baseUri
  ) external {
    NftCollection _collection = new NftCollection(
      _tokenName,
      _tokenSymbol,
      _presaleDate,
      _mysteryBoxCap,
      _nftCap,
      _mysteryBoxUsdPrice,
      _nftUsdPrice,
      _baseUri
    );

    collection[address(_collection)] = Collections(
      _presaleDate,
      _mysteryBoxCap,
      _nftCap,
      msg.sender,
      _mysteryBoxUsdPrice,
      _nftUsdPrice
    );

    collections.push(address(_collection));
  }

  function getCollection(address _collection) external view returns(Collections memory) {
    return collection[_collection];
  }
}