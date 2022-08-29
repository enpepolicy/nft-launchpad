// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICollectionFactory {
  
  struct Collections {
    address collectionAddress;
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
    string tokenDescription;
  }

	function updateAvailableNFts(address _nftCollection,address _user, uint16 _indexToDelete) external;
  function getCollection(address _collectionAddress) external view returns(Collections memory);
  function getUserCollections(address _userAddress) external view returns(address[] memory);
  function getTokenIdsByUser(address _user, address _collection) external view returns (uint [] memory);
}