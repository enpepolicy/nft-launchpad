// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AggregatorInterface.sol";
import "./AggregatorV3InterfaceTesting.sol";

interface AggregatorV2V3Interface is AggregatorInterface, AggregatorV3InterfaceTesting {}
 