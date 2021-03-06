pragma solidity 0.6.12;

/**
 * SPDX-License-Identifier: GPL-3.0-or-later
 * Hegic
 * Copyright (C) 2020 Hegic Protocol
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IBCO is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint;

    event Claimed(address indexed account, uint userShare, uint hegicAmount);
    event Received(address indexed account, uint amount);

    uint256 public START;
    uint256 public END;
    uint256 public TOTAL_DISTRIBUTE_AMOUNT;
    uint256 public MINIMAL_PROVIDE_AMOUNT;
    uint public totalProvided = 0;
    bool private initialised;
    mapping(address => uint) public provided;
    IERC20 public token;

    function initIBCO(
        address _funder,
        IERC20 _token,
        uint256 _totalSupply,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _minimalProvide,
        address _newOwner)
    external {
        require(!initialised);
        require(_endDate > _startDate);
        require(_minimalProvide > 0);


        token = _token;
        TOTAL_DISTRIBUTE_AMOUNT = _totalSupply;
        START = _startDate;
        END = _endDate;
        MINIMAL_PROVIDE_AMOUNT = _minimalProvide;
        transferOwnership(_newOwner);
        token.safeTransferFrom(_funder, address(this), _totalSupply);
        initialised = true;}


    receive() external payable {
        require(START <= block.timestamp, "The offering has not started yet");
        require(block.timestamp <= END, "The offering has already ended");
        totalProvided += msg.value;
        provided[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    function claim() external {
        require(block.timestamp > END);
        require(provided[msg.sender] > 0);

        uint userShare = provided[msg.sender];
        provided[msg.sender] = 0;

        if(totalProvided >= MINIMAL_PROVIDE_AMOUNT) {
            uint tokenAmount = TOTAL_DISTRIBUTE_AMOUNT
                .mul(userShare)
                .div(totalProvided);
            token.safeTransfer(msg.sender, tokenAmount);
            emit Claimed(msg.sender, userShare, tokenAmount);
        } else {
            msg.sender.transfer(userShare);
            emit Claimed(msg.sender, userShare, 0);
        }
    }

    function withdrawProvidedETH() external onlyOwner {
        require(END < block.timestamp, "The offering must be completed");
        require(
            totalProvided >= MINIMAL_PROVIDE_AMOUNT,
            "The required amount has not been provided!"
        );
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawToken() external onlyOwner {
        require(END < block.timestamp, "The offering must be completed");
        require(
            totalProvided < MINIMAL_PROVIDE_AMOUNT,
            "The required amount has been provided!"
        );
        token.safeTransfer(owner(), token.balanceOf(address(this)));
    }

    function withdrawUnclaimedToken() external onlyOwner {
        require(END + 30 days < block.timestamp, "Withdrawal unavailable yet");
        token.safeTransfer(owner(), token.balanceOf(address(this)));
    }
}