## What is Gitcoin and how does it work?

Gitcoin is a site that enables (among many other things) a user to donate to projects. This page will mainly focus on understanding how their contracts fit together and how they take donations.

[Gitcoin grants contracts](https://github.com/gitcoinco/web/blob/master/docs/GRANTS.md)

Gitcoin has a batch transaction functionality allowing you to invest in multiple projects in one transaction with their batch processor, probably not necessary for this project. In the latest iteration it uses zksync (requires more research).
[Gitcoin bulk contract](https://github.com/gitcoinco/BulkTransactions/blob/master/contracts/BulkCheckout.sol), the contract mainly relies on the donate() function which takes in an array of structs, each of which contains the token to donate to, the amount and the grant.
Sends funds directly to the fund address instead of an ICO address so is a bit simpler, for our project the funds need to be routed from the ICO contract to the dev.

## Smart Contract architecture for routing funds between an ICO contract and a user.

User creates an ICO of a specific provided format, the format is a contract (dutch auction, ICBO) etc that has been predeployed to the blockchain, this template is then sent to a factory, the user's ICO is then deployed using a function within the factory, initialising the smart contract depends on the variables required by the ICO contract, these are fed in via the factory. The ICO contract then runs all of the logic from there.

The factory (which is what we need to make) is first initialised and it calls a common CloneFactory util [CloneFactory contract](https://github.com/optionality/clone-factory/tree/master/contracts). This allows the factory to replicate the ICO contract functionality by using that contract as a template, the create clone allows for this functionality.

ICO initialisation by user ----> Factory, using clone factory and the correct parameters, produces a contract based on a template already deployed to the blockchian ----> the ICO contract handles all of the logic from there.
