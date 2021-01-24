const express = require('express')

const { createListing } = require('../controllers/createListing')
const { getListingsByOwner } = require('../controllers/getListingData')
const { updateImage, updateDescription } = require('../controllers/updateIco')
const router = express.Router()

router.post('/create-listing', createListing)
router.get('/owner/:owner', getListingsByOwner)
router.put('/update-image', updateImage)
router.put('/update-description', updateDescription)

module.exports = router
