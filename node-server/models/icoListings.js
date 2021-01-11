const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IcoSchema = new Schema(
  {
    tokenName: { type: String, required: true },
    totalSupply: { type: Number, required: true },
    startPrice: { type: Number, required: true },
    bondingCurveStyle: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    paymentCurrency: { type: String },
    fundWallet: { type: String },
    projectDescription: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('listing', IcoSchema)
