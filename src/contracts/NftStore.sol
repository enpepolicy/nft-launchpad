// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CollectionFactory.sol";



contract NftStore {
  // Buy Mystery Box
  // Mint NFT

  address public factoryAddress;
  CollectionFactory collectionFactory;

  mapping(address => mapping(address => uint)) public mysteryBoxUserCounter;
  mapping(address => uint) public mysteryBoxCounter;

  constructor(
    address _factoryAddress
  )
  {
    collectionFactory = CollectionFactory(_factoryAddress);
  }


  function buyMysteryBox(address collectionAddress) external {
    // require dinero
    // require MB no excedan el maximo
    //Collections memory test = collectionFactory.getCollection(collectionAddress);
    require(block.timestamp < collectionFactory.getCollection(collectionAddress).presaleDate);
  }
}
