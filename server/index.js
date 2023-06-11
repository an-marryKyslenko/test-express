require('dotenv').config()
require('express-async-errors')

const http = require('http')
const express = require('express')
const cors = require('cors')

const notFound = require('./middeleware/notFound')
const errorHandlerMiddleware = require('./middeleware/error-handler')


const productsRouters = require('./api/products')
const mongoose = require('mongoose')

const app = express()


//middleware
app.use(cors())
app.use(express.json())

//routes

app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products rout</a>')
})
app.use('/api/v1/products', productsRouters)
// products route
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const server = http.createServer(app)

mongoose.connect('mongodb+srv://Anna-Mariia:1234@project2.ltuadeq.mongodb.net/PROJECT2?retryWrites=true&w=majority').then(()=>{
	console.log("mongodb connected");
	server.listen(port, () => {
		console.log(`Server was lisening port ${port}...`)
	})
}).catch((error) => {
	console.log(error);
})
module.exports =app
