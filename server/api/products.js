const express = require('express')
const { getAllProducts, getAllProductsStatiic } = require('../controllers/products')

const router = express.Router()

router.get('/',getAllProducts)
// router.route('/static').get(getAllProductsStatiic)

module.exports = router