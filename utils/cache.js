const config = require('./config')


// Create dummy functions for cache
if (config.ENV === 'test' || config.ENV === 'dev') {

  const cache = {
    route: (empty) => {  // eslint-disable-line no-unused-vars
      return function (request, response, next) {
        next()
      }
    }
  }

  const getCacheAsync = () => null
  const setCacheAsync = (empty) => { }  // eslint-disable-line no-unused-vars

  module.exports = {
    cache,
    getCacheAsync,
    setCacheAsync
  }

} else {


  const redis = require('redis')
  const { promisify } = require('util')

  const redisClient = redis.createClient(config.REDIS_URL)
  const cache = require('express-redis-cache')({ client: redisClient })


  module.exports = {
    cache,
    getCacheAsync: promisify(redisClient.get).bind(redisClient),
    setCacheAsync: promisify(redisClient.set).bind(redisClient),
  }

}
