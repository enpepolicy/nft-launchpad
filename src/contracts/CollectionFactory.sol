// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/// @title NFT Collection to be used by artists
/// @author Juan D. Polanco & Miquel Trallero
/// @notice This is a standard ERC721 with few, but valuable modifications
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract used in chainlink hackathon.
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

	/********************************************************
	*                                                       *
	*                       Main                            *
	*                                                       *
	********************************************************/

  /// @dev Mints NFT. It is executed by the NFTStore contract
  /// @param _nftIndex Index of NFT to be minted
  /// @param _nftOwner Owner of NFT to be minted
  function mint(uint _nftIndex, address _nftOwner) external {
    require(msg.sender == nftStoreAddress, "Only NftStore can mint");
    _safeMint(_nftOwner, _nftIndex);
  }

	/********************************************************
	*                                                       *
	*                      Getter                           *
	*                                                       *
	********************************************************/

  /// @dev Used to retrieve token metadata
  /// @param _tokenId Index of NFT to be minted
  /// @return tokenURI URI of metada which is a json object
  function getTokenUri(uint _tokenId) external view returns(string memory) {
    return  string(abi.encodePacked(baseURI, "/", _tokenId, ".json"));
  }

	/********************************************************
	*                                                       *
	*                     Internal                          *
	*                                                       *
	********************************************************/

  /// @dev Used in external mint function
  /// @return baseURI retrieves the baseURI of the NFT Collection
  function _baseURI() internal override view virtual returns (string memory) {
    return baseURI;
  }
}

/// @title NFT Collection Factory
/// @author Juan D. Polanco & Miquel Trallero
/// @notice Create your own NFT Collection leveraging chainlink VRF and datafeed tools
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract used in chainlink hackathon.
contract CollectionFactory is Ownable {

  address[] collections;
  address nftStoreAddress;
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

  mapping(address => mapping(address => uint[])) userToCollectionNfts;
  mapping(address => Collections) collection;
  mapping(address => address[]) userToCollections;
  
  // Events
  event NFTCollectionCreated(address nftCollectionAddress, uint presaleDate, uint mysteryBoxCap, uint nftCap,
  uint16[] availableNFTs, address owner, uint mysteryBoxUsdPrice, uint nftUsdPrice, bool frozen);
  event AvailableNFtsUpdated(address nftCollectionAddress, uint nftIndex);

  /// @notice Create your own Collection of unique NFTs
  /// @dev creates and deploys an ERC721 contract
  /// @param _tokenName Name of ERC721 Contract
  /// @param _tokenSymbol Symbol of ERC721 Contract
  /// @param _baseUri BaseURI where metadata is stored in IPFs
  /// @param _coverImageUri URI of cover image in IPFs
  /// @param _presaleDate Date when presale ends
  /// @param _mysteryBoxCap Limit of mystery boxes in the project
  /// @param _nftCap totalSupply of NFTs in IPFs baseURI
  /// @param _mysteryBoxUsdPrice unit cost of NFT during presale
  /// @param _nftUsdPrice unit cost of NFT when presale is over
  function createNFTCollection(
    string memory _tokenName,
    string memory _tokenSymbol,
    string memory _baseUri,
    string memory _coverImageUri,
    uint _presaleDate,
    uint16 _mysteryBoxCap,
    uint16 _nftCap,
    uint _mysteryBoxUsdPrice,
    uint _nftUsdPrice,
    string memory _tokenDescription
  ) external {

    require(_mysteryBoxCap <= _nftCap, "CollectionFactory: Presale Supply is higher than total NFT Supply");
    // Initialize array to later on pick nft to mint
    uint16[] memory _availableNfts = new uint16[](_nftCap);
    for(uint16 i = 0; i < _nftCap; i++) {
      _availableNfts[i] = i;
    }
    // Deploys ERC721 Contract
    NftCollection _collection = new NftCollection(
      _tokenName,
      _tokenSymbol,
      _baseUri,
      nftStoreAddress
    );
    // Stores onchain data used to mint NFTs
    collection[address(_collection)] = Collections(
      address(_collection),
      _presaleDate,
      _mysteryBoxCap,
      _nftCap,
      _availableNfts,
      msg.sender,
      _mysteryBoxUsdPrice,
      _nftUsdPrice,
      false,
      _coverImageUri,
      _tokenName,
      _tokenDescription
    );
    collections.push(address(_collection));
    userToCollections[msg.sender].push(address(_collection));
    emit NFTCollectionCreated(address(_collection), _presaleDate, _mysteryBoxCap, _nftCap,
    _availableNfts, msg.sender, _mysteryBoxUsdPrice, _nftUsdPrice, false);
  }

	/********************************************************
	*                                                       *
	*                      Getters                          *
	*                                                       *
	********************************************************/

  /// @notice Create your own Collection of unique NFTs
  /// @dev creates and deploys an ERC721 contract
  /// @param _collectionAddress Name of ERC721 Contract
  /// @return collectionData returns onchain data of NFTCollection input
  function getCollection(address _collectionAddress) external view returns(Collections memory) {
    return collection[_collectionAddress];
  }

  /// @dev used to display all collections in front-end
  /// @return AllCollectionData returns onchain data of all NFT Collections deployed using this contract
  function getAllCollectionData() external view returns(Collections[] memory) {
    address [] memory _collections = collections;
    Collections[] memory _collectionData = new Collections[](_collections.length);
    for(uint16 i = 0; i < _collections.length; i++ ) {
      _collectionData[i] = collection[_collections[i]];
    }
    return _collectionData;
  }

  /// @dev used to display all collections of a user in front-end
  /// @return myCollectionData returns onchain data of all my NFT Collections deployed using this contract
  function getDetailedCollectionsByAddress(address _userAddress) external view returns(Collections[] memory) {
    address [] memory _collections = userToCollections[_userAddress];
    Collections[] memory _collectionData = new Collections[](_collections.length);
    for(uint16 i = 0; i < _collections.length; i++ ) {
      _collectionData[i] = collection[_collections[i]];
    }
    return _collectionData;
  }

	/********************************************************
	*                                                       *
	*                      SETTERS                          *
	*                                                       *
	********************************************************/

  /// @notice Sets address of NFT Store Contract
  /// @dev It uses onlyOwner OpenZeppelin library. There is a mutual dependency/interaction between this contract and NFTStore. Hence, a setter is needed here.
  /// @param _nftStoreAddress Address of NFT Store Contract
  function setNftStoreAddress(address _nftStoreAddress) external onlyOwner {
    nftStoreAddress = _nftStoreAddress;
  }

  /// @notice updates presale date of a contract
  /// @param _collectionAddress Address of NFT Contract
  /// @param _presaleDate new presale date
  function updatePresaleDate(address _collectionAddress, uint _presaleDate) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].presaleDate = _presaleDate;
  }

  /// @dev used by NFTStore contract after minting an NFT, so that this NFT cannot be minted again
  /// @param _nftCollection Address of NFT Contract
  /// @param _indexToDelete index of NFT that cannot be minted anymore
  function updateAvailableNFts(address _nftCollection,address _user, uint16 _indexToDelete) external {
    require(msg.sender == nftStoreAddress, "Only nftStore can update this");
    uint16[] storage _availableNfts = collection[_nftCollection].availableNfts;
    _availableNfts[_indexToDelete] = _availableNfts[_availableNfts.length - 1];
    userToCollectionNfts[_user][_nftCollection].push(_availableNfts[_indexToDelete]);
    _availableNfts.pop();
    emit AvailableNFtsUpdated(_nftCollection, _indexToDelete);
  }

  /// @notice updates unit price of mystery box of a NFT Collection
  /// @dev can only be called by owner of callection
  /// @param _collectionAddress Address of NFT Contract
  /// @param _mysteryUSDPrice new price in dollars with 2 decimals. E.g 2,00 $ -> 200
  function updadatePrice(address _collectionAddress, uint _mysteryUSDPrice, uint _nftUSDPrice) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].mysteryBoxUsdPrice = _mysteryUSDPrice;
    collection[_collectionAddress].nftUsdPrice = _nftUSDPrice;
  }

  /// @notice switch the frozenFlag boolean value
  /// @dev Only owner of collection can call this function. if users switches this no NFTs from the collection can be bought. 
  /// @param _collectionAddress Address of NFT Contract
  function updateFrozenFlag(address _collectionAddress) external collectionOwner(_collectionAddress) {
    collection[_collectionAddress].frozen = !collection[_collectionAddress].frozen;
  }

	/********************************************************
	*                                                       *
	*                     MODIFIERS                         *
	*                                                       *
	********************************************************/

	modifier collectionOwner(address _collectionAddress) {
		require(msg.sender == collection[_collectionAddress].owner, "Not Collection Owner");
		_;
	}
}