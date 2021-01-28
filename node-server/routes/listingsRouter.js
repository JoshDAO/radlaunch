const express = require('express')

const { createListing } = require('../controllers/createListing')
const {
  getListingsByOwner,
  getListingsByContractAddress,
} = require('../controllers/getListingData')
const { updateImage, updateDescription } = require('../controllers/updateIco')
const router = express.Router()

router.post('/create-listing', createListing)
router.get('/owner/:owner', getListingsByOwner)
router.get('/address/:contractAddress', getListingsByContractAddress)
router.put('/update-image', updateImage)
router.put('/update-description', updateDescription)

module.exports = router
