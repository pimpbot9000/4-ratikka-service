const config = require('./config')

let cache = null

if (config.REDIS_URL) {

  const redis = require('redis')
  cache = require('express-redis-cache')({ client: redis.createClient(config.REDIS_URL) })

} else {

  const ExpressRedisCache = require('express-redis-cache')  
  cache = ExpressRedisCache({
    expire: 10,
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  })
}

module.exports = { cache }