const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IcoSchema = new Schema(
  {
    owner: { type: String, required: true }, //project owner's wallet
    tokenAddress: { type: String, required: true },
    imageUrl: { type: String },
    projectDescription: { type: String },
    // contractAddress: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('listing', IcoSchema)
