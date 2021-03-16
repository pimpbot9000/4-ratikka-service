const config = require('./config')

if (config.ENV === 'test' || config.ENV === 'dev'){

  const cache = {
    route: (_) => {
      return function (request, response, next) {
      next()
      }
    }
  }

  console.log("Created dummy cache (just a dummy middleware)")
  module.exports = { cache } 

} else {  

  
  const redis = require('redis')
  const cache = require('express-redis-cache')({ client: redis.createClient(config.REDIS_URL) })

  module.exports = { cache }

}
