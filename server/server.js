const express = require('express')
const cors = require('cors')
require('dotenv').config()

const restaurantsRouter = require('./routes/restaurants')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/v1/restaurants', restaurantsRouter)

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}...`))