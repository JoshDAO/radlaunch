# ico-manager

Jibran's Idea for the encode hackathon

[Current frontend](https://radlaunch.netlify.app)

## ICO Management Tool - Encode Hack idea

## Introduction

An Initial Coin Offering (ICO) is the first time that a company that utilizes their own native cryptocurrency or token releases their token for ownership to the public. They can be likened to a traditional IPO in which a company issues shares of the company to the public.
Currently, there are multiple methods to conduct an ICO. Direct listing, this involves floating the cryptocurrency on an exchange such as Uniswap ([uniswap-listing](https://tokenmint.io/blog/how-to-list-your-custom-erc20-token-to-uniswap.html) or directing funds to a contract address (e.g. [direct-funding-contract-example](https://token.exchase.top/). Alternatively, a project may conduct an ICO on their own website, a few examples include: Initial Bonding Curve offering (e.g. [IBCO](https://medium.com/hegic/join-hegic-initial-bonding-curve-offering-d1746a32a552), Reversible ICO (e.g. [Reversible ICO](https://rico.lukso.network/faq), Dutch auction [Algorand Dutch Auction](https://algorand.foundation/algo-auctions), the airdrop strategy, and many more…

## Problem and Solution

A platform that allows ANY project to deploy custom ICO strategies in a decentralized manner does not currently exist. A direct listing solution does not allow the flexibility for a project to adopt an alternative ICO style. In addition, conducting a custom ICO, whilst providing flexibility to the project may be costly, time consuming and since each ICO is developed by the project there can be unintentional or intentional flaws in the process, which reduce the safety and reliability of projects.
The proposed solution involves providing a platform on which a project can execute common and alternative ICO strategies, such as the dutch auction, ICBO etc. This provides flexibility, cost/time savings and peace of mind (no unintentional flaws) to honest developers, reduces the ability of dishonest developers to exploit investors and provides accessibility to new projects and peace of mind to investors who know that their finances cannot be exploited.

## Existing Platforms

Coinlist – the most similar existing platform. A platform that allows people to invest in ICOs and buy cryptocurrencies, an example of a listing: [coinlist-flow](https://coinlist.co/flow). Whilst a great product, the solution is NOT decentralized and furthermore, its tools are quite exclusive and expensive. Only very high-profile projects will have access to the suite of tools.

Polkastarter  
Bounce

## Envisioned creation process and functionality

The project should be built on an EVM compatible solution such that ERC20 tokens can be managed. In the context of the hackathon the most ideal solution would be on Polkadot (Moonbeam or potentially Acala) or a standalone Ethereum project. For this hackathon, one ICO style should be focused on, I propose the dutch auction style. [dutch auction definition](https://medium.com/hackernoon/big-crypto-projects-are-using-dutch-auctions-for-their-token-sale-heres-why-c28c0d47ad1d). The project should include a great frontend which contains an investor and developer section.
Investor section: Contains the projects that users can invest in, along with clear explanations on the project and the ICO style adopted. Allows a user to participate in ICO of the project if they have a metamask wallet and the funds!
Developer section: Contains the tools and interfaces to allow a developer to list their project on the platform, then the tools to manage the ICO henceforth. In the future the platform could also provide governance services.
Advice on how the backend will work will be appreciated but I imagine there will at least be a smart contract required to facilitate any ICO’s.

- Dutch Auction, “is a public offering auction structure in which the price of the offering is set after taking in all bids to determine the highest price at which the total offering can be sold. In this type of auction, investors place a bid for the amount they are willing to buy in terms of quantity and price.”
  In this type of auction, instead of buyers purchasing an offering at a fixed price, the process allows anyone to bid their own chosen quantity and price they are willing to pay. Unlike traditional auctions, the price of the asset continues to fall until the winning bid is made.

Roadmap

1. Develop Ethereum prototype including IBCO and dutch auction.
2. Develop fairlaunch ICO mechanisms and private presales
3. Deploy to Polkadot Moonbeam for crosschain interoperability.
