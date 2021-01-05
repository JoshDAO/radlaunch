pragma solidity ^0.6.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERCToken is ERC20("ERCToken", "ERC") {
    constructor() public{
        _mint(msg.sender, 1000000e18 );
    }


}
