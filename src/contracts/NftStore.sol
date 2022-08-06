// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CollectionFactory.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


contract NftStore is VRFConsumerBaseV2 {

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

  address public factoryAddress;
  CollectionFactory collectionFactory;

  mapping(address => mapping(address => uint)) public mysteryBoxUserCounter;
  mapping(address => uint) public mysteryBoxCounter;
  mapping(address => uint) public nftCounter;
  mapping(uint => address) requestToSender;
  mapping(uint => address) requestToCollection;

  constructor(
    address _factoryAddress,
    uint64 subscriptionId, 
    address _vrfCoordinator, 
    address _link, 
    bytes32 _keyHash, 
    uint32 _callbackGasLimit, 
    uint16 _requestConfirmations
  )
    VRFConsumerBaseV2(_vrfCoordinator)
  {
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
  }


  function buyMysteryBox(address _collectionAddress) public {
    // require dinero
    require(
      mysteryBoxCounter[_collectionAddress] < collectionFactory.getCollection(_collectionAddress).mysteryBoxCap,
      "NftStore: all Mystery Boxes were already sold"
    );
    require(
      block.timestamp < collectionFactory.getCollection(_collectionAddress).presaleDate, 
      "NftStore: presale is over"
    );
    // obtener admin de Factory
    // Pagar al admin
    mysteryBoxUserCounter[msg.sender][_collectionAddress] ++;
  }

  function mint(address _collectionAddress) public {
    if(block.timestamp < collectionFactory.getCollection(_collectionAddress).presaleDate) {
      require(
        mysteryBoxUserCounter[msg.sender][_collectionAddress] > 0,
        "NftStore: a Mystery Box must be purchased to mint during presale");
      mysteryBoxUserCounter[msg.sender][_collectionAddress] --;
    } else {
      // require money
    }

    require(
      nftCounter[_collectionAddress] < collectionFactory.getCollection(_collectionAddress).nftCap,
      "NftStore: all NFT were already sold"
    );
    _requestRandomWords(1);
  }

  function _requestRandomWords(uint32 _numWords) internal {
    s_requestId  = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      _numWords
    );  
    requestToSender[s_requestId] = msg.sender;
  }

  function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) 
    internal override 
  {
    address user = requestToSender[requestId];
    address collectionAddress = requestToCollection[requestId];    
    // Use the random number to get the Nft Id
    // Create collection instance
    // Call mint function from collection
  }
}