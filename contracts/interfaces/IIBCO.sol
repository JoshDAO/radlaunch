pragma solidity ^0.6.9;

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

interface IIBCO {

    function initIBCO (
            address _funder,
            IERC20 _token,
            uint256 _tokenSupply,
            uint256 _startDate,
            uint256 _endDate,
            uint256 _minimalProvide
        ) external ;
//    function tokensClaimed(address user) external view returns (uint256);
//    function tokenSupply() external view returns(uint256);
//    function wallet() external view returns(address);
//    function endDate() external view returns(uint256);


}