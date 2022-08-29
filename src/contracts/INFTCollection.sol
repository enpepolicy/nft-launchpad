// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFTCollection {
	function mint(uint _nftIndex, address _nftOwner) external;
}