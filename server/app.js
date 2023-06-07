require('dotenv').config()
require('express-async-errors')


const express = require('express')
const notFound = require('./middeleware/notFound')
const errorHandlerMiddleware = require('./middeleware/error-handler')

const app = express()

const connectDB = require('./bd/conect')
const productsRouters = require('./routes/products')

//middleware
app.use(express.static('public'))
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

const start = async () => {
	try {
		//connect DB
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server was lisening port ${port}...`))
	} catch (error) {
		console.log(error);
	}
}

start()