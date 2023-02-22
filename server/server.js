const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/api/v1/restaurants', (req, res) => {

})

app.get('/api/v1/restaurants/:id', (req, res) => {
})

app.post('/api/v1/restaurants', (req, res) => {
})

app.put('/api/v1/restaurants/:id', (req, res) => {
})

app.delete('/api/v1/restaurants/:id', (req, res) => {
})

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}...`))