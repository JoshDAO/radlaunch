## How does a Dutch auction work?

1. A seller will set an amount of tokens available to be bought, along with the deadline for the sale, the starting price and the reserve price (lowest price the seller is willing to sell for).
2. The auction will start at the starting price as time goes on the price drops until a point where either all tokens are sold or the auction hits the minimum price.
3. During the auction a buyer can bid, this will set their total spend and a maximum price per token. Thus, as the price of the token drops the buyer's total spend stays the same whilst the amount of token they receive increases.
4. When either of the ending criteria are met (all tokens are sold or minimum price met). Send funds to seller and allocate tokens to buyers. If no one bid or the seller cancelled the auction return the tokens to the seller.

e.g. Alice, Bob and Chloe are entering Kevin's auction of KEV tokens.
There are 1000 Kev tokens starting at $10 each with a reserve price of $2.
1. Alice commits $500 at the starting price alloting her at least 50 KEV and dropping the Kev supply to 950 KEV.
2. As time passes the price drops, when the price drops to $5, at this price Alice will now receive at least 100 KEV, meaning the KEV supply is 900.
Bob decides to commit $300, at $5 he will receive at least 60 KEV, meaning the KEV supply reduces to 840 KEV.
3. The price is now at $2, at this price Alice will receive 250 KEV, Bob will receive 150 KEV. Chloe now finally commits $1000 this will alot her 500 KEV.
4. Now the auction ends as the reserve price is met.

RESULTS:

Alice has 250 KEV and has committed $500
Bob has 150 KEV and has committed $300
Chloe has 500 KEV and has committed $1000

There are 100 KEV left and committed funds of $1800. These are returned to Kevin.

## Variations

Algorand introduced a refund policy whereby if you commit above a certain price during the auction you could receive a 90% refund on your token within the refund period.

## Inputs by a developer for a Dutch Auction

token
token quantity to sell
payment currency
starting price
reserve price
start date 
end date
seller's ethereum address

## Example smart contracts
[hyperlink](https://github.com/deepyr/DutchSwap/tree/master/contracts)
