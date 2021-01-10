const config = require('./config')

const cache = require('express-redis-cache')({ client: redis.createClient(config.REDIS_URL) })

module.exports = { cache }