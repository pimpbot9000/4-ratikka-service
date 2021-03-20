const config = require('./config')


if (config.ENV === 'test' || config.ENV === 'dev') {

  const cache = {
    route: (empty) => {  // eslint-disable-line no-unused-vars
      return function (request, response, next) {
        next()
      }
    }
  }

  // dummy functions for local testing (dev config)
  const getCacheAsync = () => null
  const setCacheAsync = (empty) => { }  // eslint-disable-line no-unused-vars
  module.exports = {
    cache,
    getCacheAsync,
    setCacheAsync
  }

} else {

  console.log('Configure cache')
  const redis = require('redis')
  //const cache = require('express-redis-cache')({ client: redis.createClient(config.REDIS_URL) })

  const { promisify } = require('util')
  const redisClient = redis.createClient(config.REDIS_URL)
  const cache = require('express-redis-cache')({ client: redisClient })
  console.log('Cache configured')

  module.exports = {
    cache,
    getCacheAsync: promisify(redisClient.get).bind(redisClient),
    setCacheAsync: promisify(redisClient.set).bind(redisClient),

  }

}
