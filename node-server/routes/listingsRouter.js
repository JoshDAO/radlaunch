const express = require('express')

const { createListing } = require('../controllers/createListing')
const { getListingsByOwner } = require('../controllers/getListingData')
const router = express.Router()

router.post('/create-listing', createListing)
router.get('/owner/:owner', getListingsByOwner)

module.exports = router
