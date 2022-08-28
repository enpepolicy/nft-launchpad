// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


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