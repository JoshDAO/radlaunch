const IcoSchema = require('../models/icoListings')

createListing = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a listing',
    })
  }

  let listing = await IcoSchema.findOne({ tokenName: body.tokenName })
  if (listing) {
    return res.status(400).json({
      message: 'Listing with that name already exists',
      success: false,
    })
  }

  const newListing = new IcoSchema(body)
  if (!newListing) {
    return res.status(400).json({ success: false, error: 'Unable to create new listing' })
  }

  return newListing
    .save()
    .then((listing) => {
      console.log(listing)
      return res.status(200)
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'User not created',
      })
    })
}

module.exports = { createListing }
