// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./INFTCollection.sol";
import "./ICollectionFactory.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// @title NFT Store
/// @author Juan D. Polanco & Miquel Trallero
/// @notice Buy a Mystery Box or an NFT from a specific collection
/// @dev All function calls are currently implemented without side effects
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
  ICollectionFactory collectionFactory;

  struct UserMysteryBoxes {
    address collectionAddres;
    uint counter;
  }

  struct UserNfts {
    address collectionAddres;
    uint[] nftIds;
  }

  mapping(address => mapping(address => uint)) public mysteryBoxUserCounter;
  mapping(address => mapping(address => bool)) userHasCollectionMB;
  mapping(address => mapping(address => bool)) userHasCollectionNft;
  mapping(address => address[]) userToCollectionsMB;
  mapping(address => address[]) userToCollectionsNft;
  mapping(address => uint) public mysteryBoxCounter;
  mapping(address => uint) public nftCounter;
  mapping(uint => address) requestToSender;
  mapping(uint => address) requestToCollection;
  mapping(address => uint) userToRequest;
  mapping(uint => uint16) requestToIndex;

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
    collectionFactory = ICollectionFactory(_factoryAddress);
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

  /// @notice only available during presale period
  /// @dev buy a Mystery Box
  /// @param _collectionAddress contract address of the collection
  function buyMysteryBox(address _collectionAddress) public payable {    
    ICollectionFactory.Collections memory collections = collectionFactory.getCollection(_collectionAddress);
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
    if(userHasCollectionMB[msg.sender][_collectionAddress] == false) {
      userHasCollectionMB[msg.sender][_collectionAddress] = true;
      userToCollectionsMB[msg.sender].push(_collectionAddress);
    }
  }

  /// @notice user can use it either paying or purchasing first a Mystery Box
  /// @dev mint an NFT
  /// @param _collectionAddress contract address of the collection
  function mint(address _collectionAddress) public payable {
    ICollectionFactory.Collections memory collections = collectionFactory.getCollection(_collectionAddress);
    require(
      block.timestamp > collections.presaleDate,
      "NftStore: NFT cannot be minted during presale"
    );

    require(
      (nftCounter[_collectionAddress] + mysteryBoxCounter[_collectionAddress]) < collections.nftCap,
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
    _requestRandomWords(1, _collectionAddress, msg.sender);
    if(userHasCollectionNft[msg.sender][_collectionAddress] == false) {
      userHasCollectionNft[msg.sender][_collectionAddress] = true;
      userToCollectionsNft[msg.sender].push(_collectionAddress);
    }

  }

  function _requestRandomWords(uint32 _numWords, address _collectionAddress, address _user) internal {
    s_requestId  = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      _numWords
    );
    requestToSender[s_requestId] = _user;
    requestToCollection[s_requestId] = _collectionAddress;
    userToRequest[_user] = s_requestId;
  }

  function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) 
    internal override 
  {
    address collectionAddress = requestToCollection[requestId];
    uint remaining = collectionFactory.getCollection(collectionAddress).availableNfts.length;
    uint16 index = uint16(randomWords[0] % remaining);
    // requestToIndex[requestId] = index;
    collectionFactory.updateAvailableNFts(collectionAddress, requestToSender[requestId],index );
  }

  function revealNFT(address _user) external {
    collectionFactory.updateAvailableNFts(
      requestToCollection[userToRequest[_user]],
      _user, 
      requestToIndex[userToRequest[_user]]); // REVIEW: updateColllection is named udateAvailableNFTs now
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

  /// @dev get an array of mystery boxes purchased by a user
  /// @param _user user address
  /// @return UserMysteryBoxes array which contains collection and number of Mystery Boxes
  function getUserMysteryBoxes(address _user) public view returns (UserMysteryBoxes[] memory) {
    address[] memory collections = userToCollectionsMB[_user];
    UserMysteryBoxes[] memory userMysteryBoxes = new UserMysteryBoxes[](collections.length);
    for(uint i = 0; i < collections.length; i++) {
      uint counter = mysteryBoxUserCounter[_user][collections[i]];
      userMysteryBoxes[i] = UserMysteryBoxes(
        collections[i],
        counter
      );    
    }
    return userMysteryBoxes;
  }

  /// @dev get an array of NFTs purchased by a user
  /// @param _user user address
  /// @return UserNfts array which contains collection and number of NFTs
  function getUserNfts(address _user) public view returns(UserNfts[] memory) {
    address[] memory collections = userToCollectionsNft[_user];
    UserNfts[] memory userNfts = new UserNfts[](collections.length);
    for(uint i = 0; i < collections.length; i++) {
      uint[] memory nftIds = collectionFactory.getTokenIdsByUser(_user, collections[i]);
      userNfts[i] = UserNfts(
        collections[i],
        nftIds
      );    
    }
    return userNfts;
  }

  /// @dev get the price of the usd amount in native currency
  /// @param _usdAmount amount of USD to convert to native currency
  function getTokenAmount(uint _usdAmount) public view returns(uint) {
    uint amount = _usdAmount * (10 ** 18) * (10 ** 6) / getLatestPrice();
    return (amount + (amount * 5 / 100));
  }

}