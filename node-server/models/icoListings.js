const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IcoSchema = new Schema(
  {
    tokenAddress: { type: String, required: true }, // address of the ERC-20 contract
    tokenName: { type: String, required: true },
    tokenSymbol: { type: String, required: true },
    totalSupply: { type: Number, required: true }, // total number of token existing on the ERC-20 contract
    icoAddress: { type: String, required: true }, // address of contract created by the factory
    icoTokenSupply: { type: Number, required: true }, // number of tokens made available on the ICO. Must be <= totalSupply
    launchType: { type: String, required: true },
    owner: { type: String, required: true }, //project owner's wallet
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minimumThreshold: { type: Number, required: true }, // given in ETH
    projectDescription: { type: String },
    etherscanLink: { type: String, required: true }, //'https://etherscan.io/address/${icoAddress}'
  },
  { timestamps: true },
)

module.exports = mongoose.model('listing', IcoSchema)
