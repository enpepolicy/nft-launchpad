// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CollectionFactory.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract NftStore is VRFConsumerBaseV2 {

  // Chainlink price feed interface
  AggregatorV3Interface priceFeed;
  // ChainLink parameters for getting random number
  VRFCoordinatorV2Interface COORDINATOR;
  LinkTokenInterface LINKTOKEN;
  // RadikalRiders Chainlink subscription ID.
  uint64 s_subscriptionId;
  // Polygon Mainnet coordinator
  address vrfCoordinator;
  // Polygon Mainnet LINK token contract
  address link;
  // The gas lane to use, which specifies the maximum gas price to bump to
  bytes32 keyHash;
  // fulfillRandomWords() function. Storing each word costs about 20,000 gas
  uint32 callbackGasLimit;
  // The default is 3, but you can set this higher.
  uint16 requestConfirmations;
  // Last Chainlink requestId generated for this contract
  uint256 public s_requestId;
  // LINK fee in Matic to be charged to user as result of using ChainLink
  uint chainlinkFeeMatic;
  // Admin address
  address payable admin;

  address public factoryAddress;
  CollectionFactory collectionFactory;

  mapping(address => mapping(address => uint)) public mysteryBoxUserCounter;
  mapping(address => uint) public mysteryBoxCounter;
  mapping(address => uint) public nftCounter;
  mapping(uint => address) requestToSender;
  mapping(uint => address) requestToCollection;

  constructor(
    address _priceFeedAddress,
    address _factoryAddress,
    uint64 subscriptionId, 
    address _vrfCoordinator, 
    address _link, 
    bytes32 _keyHash, 
    uint32 _callbackGasLimit, 
    uint16 _requestConfirmations,
    address payable _admin
  )
    VRFConsumerBaseV2(_vrfCoordinator)
  {
    priceFeed = AggregatorV3Interface(_priceFeedAddress);
    collectionFactory = CollectionFactory(_factoryAddress);
    vrfCoordinator = _vrfCoordinator;
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    link = _link; 
    keyHash = _keyHash;
    callbackGasLimit = _callbackGasLimit;
    requestConfirmations = _requestConfirmations;
    LINKTOKEN = LinkTokenInterface(link);    
    s_subscriptionId = subscriptionId;
    // Fee to pay chainLink VRF usage in presale
    chainlinkFeeMatic = 60000000000000000;
    admin = _admin;
  }  

  function buyMysteryBox(address _collectionAddress) public payable {    
    CollectionFactory.Collections memory collections = collectionFactory.getCollection(_collectionAddress);
    require(
      mysteryBoxCounter[_collectionAddress] < collections.mysteryBoxCap,
      "NftStore: all Mystery Boxes were already sold"
    );
    require(
      block.timestamp < collections.presaleDate, 
      "NftStore: presale is over"
    );
    uint price = collections.mysteryBoxUsdPrice * (10 ** 18) * (10 ** 6) / getLatestPrice();
    require(
      (price + chainlinkFeeMatic) <= msg.value,
      "NftStore: the amount paid did not cover the price"
    );

    address payable owner = payable(collections.owner);
    owner.transfer(price);
    admin.transfer(chainlinkFeeMatic);
    payable(msg.sender).transfer(msg.value - price - chainlinkFeeMatic);
    mysteryBoxUserCounter[msg.sender][_collectionAddress] ++;
    mysteryBoxCounter[_collectionAddress] ++;
  }

  function mint(address _collectionAddress) public payable {
    CollectionFactory.Collections memory collections = collectionFactory.getCollection(_collectionAddress);
    require(
      block.timestamp > collections.presaleDate,
      "NftStore: NFT cannot be minted during presale"
    );

    require(
      nftCounter[_collectionAddress] < (collections.nftCap + mysteryBoxCounter[_collectionAddress]),
      "NftStore: all NFT were already sold"
    );

    if(mysteryBoxUserCounter[msg.sender][_collectionAddress] == 0) {
      uint price = collections.nftUsdPrice * (10 ** 18) * (10 ** 6) / getLatestPrice();
      require(
        (price + chainlinkFeeMatic) <= msg.value,
       "NftStore: the amount paid did not cover the price"
      );
      address payable owner = payable(collections.owner);
      owner.transfer(price);
      admin.transfer(chainlinkFeeMatic);
      payable(msg.sender).transfer(msg.value - price - chainlinkFeeMatic);
    } else {
      mysteryBoxUserCounter[msg.sender][_collectionAddress] --;
      mysteryBoxCounter[_collectionAddress] --;
    }
    nftCounter[_collectionAddress] ++;
    _requestRandomWords(1, _collectionAddress);
  }

  function _requestRandomWords(uint32 _numWords, address _collectionAddress) internal {
    s_requestId  = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      _numWords
    );  
    requestToSender[s_requestId] = msg.sender;
    requestToCollection[s_requestId] = _collectionAddress;
  }

  function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) 
    internal override 
  {
    address user = requestToSender[requestId];
    address collectionAddress = requestToCollection[requestId];

    uint remaining = collectionFactory.getCollection(collectionAddress).availableNfts.length;
    uint16 index = uint16(randomWords[0] % remaining);
    collectionFactory.updateCollection(collectionAddress, index);
    NftCollection nftCollection = NftCollection(collectionAddress);
    nftCollection.mint(index, user);
  }

  function getLatestPrice() public view returns (uint) {
    (
      /*uint80 roundID*/,
      int price,
      /*uint startedAt*/,
      /*uint timeStamp*/,
      /*uint80 answeredInRound*/
    ) = priceFeed.latestRoundData();
    return uint(price);
  }

}