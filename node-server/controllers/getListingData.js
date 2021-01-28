const IcoSchema = require('../models/icoListings')

getListingsByOwner = async (req, res) => {
  const owner = req.params.owner
  console.log(owner)

  await IcoSchema.find({ owner: owner }, (err, icos) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!icos) {
      return res.status(404).json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: icos })
  }).catch((err) => console.log(err))
}

getListingsByContractAddress = async (req, res) => {
  const contractAddress = req.params.contractAddress
  console.log(owner)

  await IcoSchema.findOne({ owner: owner }, (err, icos) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!icos) {
      return res.status(404).json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: icos })
  }).catch((err) => console.log(err))
}

module.exports = { getListingsByOwner, getListingsByContractAddress }
