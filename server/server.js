const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const {getAllRestaurants, getOneRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} = require('./controllers')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/v1/restaurants', getAllRestaurants)
app.get('/api/v1/restaurants/:id', getOneRestaurant)
app.post('/api/v1/restaurants', createRestaurant)
app.put('/api/v1/restaurants/:id', updateRestaurant)
app.delete('/api/v1/restaurants/:id', deleteRestaurant)

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}...`))