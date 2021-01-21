const express = require('express')

const { createListing } = require('../controllers/createListing')
const router = express.Router()

router.post('/create-listing', createListing)

module.exports = router
