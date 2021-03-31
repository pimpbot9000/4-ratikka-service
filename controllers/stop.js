const stopRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const { cache } = require('../utils/cache')

stopRouter.get('/stops/:id', (request, response, next) => {
  response.express_redis_cache_name = `stop-${request.params.id}`
  next()
}, cache.route({ expire: 5 }), async (request, response) => {

  const id = request.params.id

  let readableResult = await queryStop(id)

  if (readableResult) {
    return response
      .status(200)
      .json(readableResult)
  } else {
    return response
      .status(404)
      .send('Not found').end()
  }
})

const queryStop = async (id) => {
  try {
    let result = await axios({
      url: config.HSL_API_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      data: getQueryDataForStop(id)
    })

    if (result.data.data.stops.length == 0) {
      return null
    }

    result = result.data.data.stops[0]

    const readableResult = {
      id: result.gtfsId,
      name: result.name
    }

    return readableResult

  } catch (e) {
    return null
  }
}


const getQueryDataForStop = (stopId) => `{
    stops(name: "${stopId}") {
      gtfsId
      name    
    }
  }`


module.exports = { stopRouter, queryStop }