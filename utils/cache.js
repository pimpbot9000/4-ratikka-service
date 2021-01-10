const config = require('./config')
const redis = require('redis')
const cache = require('express-redis-cache')({ client: redis.createClient(config.REDIS_URL) })

module.exports = { cache }