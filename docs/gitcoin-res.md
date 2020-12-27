## What is Gitcoin?

Gitcoin is a site that enables (among many other things) a user to donate to projects. This page will mainly focus on understanding how their contracts fit together and how they take donations.

[Gitcoin grants contracts](https://github.com/gitcoinco/web/blob/master/docs/GRANTS.md)

Gitcoin has a batch transaction functionality allowing you to invest in multiple projects in one transaction with their batch processor, probably not necessary for this project. In the latest iteration it uses zksync (requires more research).
[Gitcoin bulk contract](https://github.com/gitcoinco/BulkTransactions/blob/master/contracts/BulkCheckout.sol), the contract mainly relies on the donate() function which takes in an array of structs, each of which contains the token to donate to, the amount and the grant.
Sends funds directly to the fund address instead of an ICO address so is a bit simpler, for our project the funds need to be routed from the ICO contract to the dev.
