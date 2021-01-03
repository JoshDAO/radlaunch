pragma solidity ^0.6.9;
//// This connects to the ICO contract templates, will potentially have a seperate factory for each ICO type, alternatively, one factory can contain all of the templateAddresses in a list. The ICO templates will be used from elsewhere and adapted if necessary, links to certain contracts have been provided.
//// The pseudocode is written such that it could apply to any ICO type. emits havent been included yet, interfaces will be taken from ICO contracts.
//
//import CloneFactory.sol [Clone Factory contract](https://github.com/optionality/clone-factory/blob/master/contracts/CloneFactory.sol)
//import Ownable
//import SafeMath
//import interfaces
//
//contract Factory is Ownable, CloneFactory
//
//templateAddress = address of ICO template to be replicated
//newAddress = address for the new ICO template
//
////(could change this to constructor instead, thoughts?)
//function initFactory{
//  initialise owner
//  set the template
//  //(maybe a fee?)}
//
//function setTemplate(address _templateAddress){
//  require(owner)
//  templateAddress = _templateAddress}
//
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
//receive () external payable {
//      revert();
//   }