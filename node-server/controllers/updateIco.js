const IcoSchema = require('../models/icoListings')

updateDescription = async (req, res) => {
  const owner = req.body.owner
  const tokenAddress = req.body.tokenAddress
  const description = req.body.projectDescription

  let listing = await IcoSchema.updateOne(
    { tokenAddress: tokenAddress, owner: owner },
    { $set: { projectDescription: description } },
  )
  if (!listing) {
    return res.status(400).json({
      message: 'No token found',
      success: false,
    })
  }
  return res.status(200).json({ status: 'ico updated' })
}

updateImage = async (req, res) => {
  const owner = req.body.owner
  const tokenAddress = req.body.tokenAddress
  const imageUrl = req.body.imageUrl

  let listing = await IcoSchema.updateOne(
    { tokenAddress: tokenAddress, owner: owner },
    { $set: { imageUrl: imageUrl } },
  )
  if (!listing) {
    return res.status(400).json({
      message: 'No token found',
      success: false,
    })
  }
  return res.status(200).json({ status: 'ico updated' })
}

module.exports = { updateDescription, updateImage }
