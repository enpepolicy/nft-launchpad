// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20Basic as linkERC20Basic } from "./ERC20Basic.sol";

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances. 
 */
contract BasicToken is linkERC20Basic {

  mapping(address => uint256) balances;

  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public override(linkERC20Basic) returns (bool) {
    balances[msg.sender] = balances[msg.sender] - (_value);
    balances[_to] = balances[_to] + _value ;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }


  function balanceOf(address _owner) view public override(linkERC20Basic) returns (uint256 balance) {
    return balances[_owner];
  }

}
