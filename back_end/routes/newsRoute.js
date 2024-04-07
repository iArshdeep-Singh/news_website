const express = require('express')
const router = express.Router()

const newsContent = require('../controllers/newsContent')

// news content route

router.post('/', newsContent)

module.exports = router