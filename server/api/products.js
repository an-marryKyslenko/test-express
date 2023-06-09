const express = require('express')
const { getAllProducts, getAllProductsStatiic } = require('../controllers/products')

const router = express.Router()

router.get('/', async(req,res)=>{
	res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ name: 'John Doe' })
})
// router.route('/static').get(getAllProductsStatiic)

module.exports = router