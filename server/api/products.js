const express = require('express')
const { getAllProducts } = require('../controllers/products')

const router = express.Router()

router.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ name: 'John Doe' })
})

router.route('/').get(getAllProducts)
module.exports = router