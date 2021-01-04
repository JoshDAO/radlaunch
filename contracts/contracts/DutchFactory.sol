pragma solidity ^0.6.9;
//// This connects to the ICO contract templates, will potentially have a seperate factory for each ICO type, alternatively, one factory can contain all of the templateAddresses in a list. The ICO templates will be used from elsewhere and adapted if necessary, links to certain contracts have been provided.
//// The pseudocode is written such that it could apply to any ICO type. emits havent been included yet, interfaces will be taken from ICO contracts.
//
//import CloneFactory.sol [Clone Factory contract](https://github.com/optionality/clone-factory/blob/master/contracts/CloneFactory.sol)
//import Ownable
//import SafeMath
//import interfaces
//
import "./utils/CloneFactory.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IDutchAuction.sol";

//contract Factory is Ownable, CloneFactory

contract DutchFactory is Ownable, CloneFactory {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

//templateAddress = address of ICO template to be replicated
//newAddress = address for the new ICO template
    address public templateAddress;

////(could change this to constructor instead, thoughts?)
//function initFactory{
//  initialise owner
//  set the template
//  //(maybe a fee?)}
//
    constructor(address template) public{
        templateAddress = template;
    }
//function setTemplate(address _templateAddress){
//  require(owner)
//  templateAddress = _templateAddress}
//
    function setDutchTemplate(address _templateAddress) external onlyOwner {
        templateAddress = _templateAddress;
    }
//function deploy(
//
////params for dutch auction  (thinking of using this one [dutchswap](https://github.com/deepyr/DutchSwap/blob/master/contracts/DutchSwapAuction.sol), (not audited) but may change to another after further review
//
//address token
//uint256 tokenSupply
//uint256 startDate
//uint256 endDate
//uint256 paymentCurrency
//uint256 startPrice
//uint256 reservePrice
//address payable wallet)
//
////params for [Hegic linear IBCO](https://github.com/hegic/initial-bonding-curve-offering/blob/master/contracts/InitialOffering/HegicInitialOffering.sol) (will need to modify the IBCO contract slightly to utilise the replication, will alter such that it has an init function that passes the variables into the contract)
//
//address token
//uint256 tokenSupply
//uint256 startDate
//uint256 endDate
//uint public constant MINIMIAL_PROVIDE_AMOUNT (the amount provided by the owner to ensure the price doesnt start at 0)
//
//public payable returns(address newAddress){
//
//// need to have a look at reentrancy
//
//ICO = createClone(templateAddress)
//require(IERC20(token).transferFrom(msg.sender, address(this), tokenSupply))
//require(IERC20(token).approve(ICO, tokenSupply))
//ICOInterface(ICO).initICO(address(this) and all params passed into this function)
//}
//
    function deployDutch(
        address _token,
        uint256 _tokenSupply,
        uint256 _startDate,
        uint256 _endDate,
        address _paymentCurrency,
        uint256 _startPrice,
        uint256 _minimumPrice,
        address payable _wallet) public payable returns (address ICO)
    {
        ICO = createClone(templateAddress);
        require(IERC20(_token).transferFrom(msg.sender, address(this), _tokenSupply));
        require(IERC20(_token).approve(ICO, _tokenSupply));
        IDutchAuction(ICO).initDutchAuction(address(this), _token, _tokenSupply, _startDate, _endDate, _paymentCurrency, _startPrice, _minimumPrice, _wallet);

    }


    function transferAnyERC20Token(address tokenAddress, uint256 tokens) public onlyOwner returns (bool success) {
        return IERC20(tokenAddress).transfer(owner(), tokens);
    }
//receive () external payable {
//      revert();
//   }
    receive () external payable {
        revert();
    }
}