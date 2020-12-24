## How does an IBCO work?

Initial Bonding Curve Offering (continuous bonding curve offering also included)

1. IBCO contributors deposit ETH to the bonding curve contract at any period within a specified time period.
2. After each contribution the price of a token will increase for a fixed value of x amount of ETH (for HEGIC this was 0.00000000001 ETH per token sold, but other bonding curve functions are possible).
3. Contributors liquidity will be pooled during the offering and the price of the token for all bidders will be the same as the settlement price will be set as the final price of the curve.
4. Then contributors can claim their tokens.

With a non-linear bonding curve [bonding curve types](https://medium.com/linum-labs/intro-to-bonding-curves-and-shapes-bf326bc4e11a) (unlike HEGIC which follows a linear relationship) it is possible for early investors to receive proportionally more tokens than later investors, meaning that they can profit if more investors join.
The problem with non-linear bonding curves are front-running, a practise by which traders may identify a large order from an investor and submit a buy order with a higher gas fee (so it processes first) and then profit from the larger subsequent trade from the investor. This can be mitigated with gas limits.
A continuous bonding curve offering is simply an IBCO with no end and may have an exponential curve for the bonding curve i.e. current price = tokenSupply^2.

## Inputs by a developer for an IBCO

1. token
2. token limit (if any)
3. token starting price
4. bonding curve function
5. start time
5. end time (if any)


## Inputs by an investor for an IBCO

1. Deposit ETH
2. Claim tokens

## Example smart contracts

[HEGIC contract, linear bonding curve](https://github.com/hegic/initial-bonding-curve-offering/blob/master/contracts/InitialOffering/HegicInitialOffering.sol), 
[Fairmint contract, continuous bonding curve](https://github.com/Fairmint/c-org/blob/master/contracts/ContinuousOffering.sol)
Octo performed one with a sigmoidal bonding curve but have been unable to find the contract [bonding-curve-release](https://octo.fi/blog/bond-curve-sale)
