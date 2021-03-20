const express = require('express')
const timetableRouter = require('./controllers/timetable')
const middleware = require('./utils/middleware')
const app = express()


app.use('/web', express.static('static'))
app.use('/api', timetableRouter)
app.use(middleware.unknownEndpoint)

module.exports = app
