const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
const config = require('./utils/config')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const app = express()

mongoose.set('strictQuery', false)
logger.info('Connecting to MongoDB')
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/', (request, response) => {
    response.send('<h1>Welcome to my Blog</h1>');
  });

app.use(middleware.unknownEndpoint)

module.exports = app
