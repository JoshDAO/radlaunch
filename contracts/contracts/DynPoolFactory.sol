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
import "./utils/CloneFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IIBCO.sol";

contract IBCOTemplate is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    event Claimed(address indexed account, uint userShare, uint hegicAmount);
    event Received(address indexed account, uint amount);

    uint256 public START;
    uint256 public END;
    uint256 public TOTAL_DISTRIBUTE_AMOUNT;
    uint256 public MINIMAL_PROVIDE_AMOUNT;
    uint256 public totalProvided = 0;
    bool private initialised;
    mapping(address => uint256) public provided;
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
        require(!initialised, "contract already initialised");
        require(_endDate > _startDate, "end date cannot be before start date");
        require(_minimalProvide > 0, "the minimum raise amount must be greater than 0");

        token = _token;
        TOTAL_DISTRIBUTE_AMOUNT = _totalSupply;
        START = _startDate;
        END = _endDate;
        MINIMAL_PROVIDE_AMOUNT = _minimalProvide;
        initialised = true;
        transferOwnership(_newOwner);
        token.safeTransferFrom(_funder, address(this), _totalSupply);}


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

        uint256 userShare = provided[msg.sender];
        provided[msg.sender] = 0;

        if(totalProvided >= MINIMAL_PROVIDE_AMOUNT) {
            uint256 tokenAmount = TOTAL_DISTRIBUTE_AMOUNT
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

//inspired by BokkyPooBahsFixedSupplyTokenFactory.sol

contract DynPoolFactory is Ownable, CloneFactory {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // state variable declarations

    address public newAddress;
    uint256 public minimumFee = 0;
    mapping(address => bool) public isProduct;
    address[] public products;

    // events
    event IBCODeployed(address indexed owner, address indexed addr, IERC20 indexed token, uint256 tokenSupply, uint256 startDate, uint256 endDate, uint256 minimalProvide);
    event MinimumFeeUpdated(uint256 oldFee, uint256 newFee);
    event FactoryDeprecated(address _newAddress);

    // utility functions
    function setMinimumFee(uint256 _minimumFee) external onlyOwner {
        emit MinimumFeeUpdated(minimumFee, _minimumFee);
        minimumFee = _minimumFee;
    }

    function numberOfProducts() public view returns (uint256){
        return products.length;
    }

    function deprecateFactory(address _newAddress) external onlyOwner {
        require(newAddress == address(0), "new factory address is already owned");
        emit FactoryDeprecated(_newAddress);
        newAddress = _newAddress;
    }

    function transferAnyERC20Token(address tokenAddress, uint256 tokens) public onlyOwner returns (bool success) {
        return IERC20(tokenAddress).transfer(owner(), tokens);
    }

    // deployment function, run this to deploy an IBCO. NEED TO CHECK THIS FUNCTION FOR REENTRANCY
    function deployIBCO(
        IERC20 _token,
        uint256 _tokenSupply,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _minimalProvide) public payable returns (IBCOTemplate ICO)
    {
        require(msg.value >= minimumFee, "Fee to launch contract is insufficient");
        require(_tokenSupply > 0, "No tokens submitted");
        require(_endDate > _startDate, "End date cannot be before the start date");
        ICO = new IBCOTemplate();
        require(_token.transferFrom(msg.sender, address(this), _tokenSupply), "token transfer to factory failed");
        require(_token.approve(address(ICO), _tokenSupply), "token approval unsuccessful");
        IBCOTemplate(ICO).initIBCO(address(this), _token, _tokenSupply, _startDate, _endDate, _minimalProvide, msg.sender);
        isProduct[address(ICO)] = true;
        products.push(address(ICO));
        emit IBCODeployed(msg.sender, address(ICO), _token, _tokenSupply, _startDate, _endDate, _minimalProvide);
        if (msg.value > 0){
            payable(owner()).transfer(msg.value);
        }
    }

    receive () external payable {
        revert();
    }
}