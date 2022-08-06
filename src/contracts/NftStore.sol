// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract NftStore {
  // Buy Mystery Box
  // Mint NFT

  address public factoryAddress;

  mapping(address => mapping(address => uint)) public mysteryBoxUserCounter;
  mapping(address => uint) public mysteryBoxCounter;

  constructor(
    address _factoryAddress
  )
  {
    factoryAddress = _factoryAddress;
  }


  function buyMysteryBox(address collection) external {
    // require dinero
    // require MB no excedan el maximo

  }
}
