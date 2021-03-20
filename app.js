const express = require('express')
const timetableRouter = require('./controllers/timetable')
const { timetableRouterGeneric } = require('./controllers/timetable-generic')
const middleware = require('./utils/middleware')
const cors = require('cors')
const app = express()

app.use(cors())
app.use('/web', express.static('static'))
app.use('/api', timetableRouter)
app.use('/v2/api', timetableRouterGeneric)
app.use(middleware.unknownEndpoint)

module.exports = app
