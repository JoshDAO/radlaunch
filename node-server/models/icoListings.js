const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IcoSchema = new Schema(
  {
    owner: { type: String, required: true }, //project owner's wallet
    imageUrl: { type: String },
    projectDescription: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('listing', IcoSchema)
