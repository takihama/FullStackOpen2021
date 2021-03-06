const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB:', err.message)
  })

app.use(cors()) // Allow requests from multiple origins
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app