const timetableRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const { cache } = require('../utils/cache')

timetableRouter.get('/', (request, response) => {
  return response.status(200).send('Vaihtoehtoina ovat: /portti, /alepa, /kadetti ja /paattari').end()
})

timetableRouter.get('/:id', (request, response, next) => {
  response.express_redis_cache_name = `stop-${request.params.id}`
  next()
}, cache.route({ expire: 5 }), async (request, response) => {

  const id = request.params.id

  const stopId = config.STOPS[id]

  if (!stopId) return response.status(404).send('404: Pysäkkiä ei löydy. Vain munccalaisille. Köyhä.').end()

  try {
    let result = await axios({
      url: config.HSL_API_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      data: getQueryData(stopId)
    })

    const arrivals = result.data.data.stop.stoptimesWithoutPatterns

    const arrivalTimes = getArrivalTimes(arrivals)

    response
      .status(200)
      .json(arrivalTimes)

  } catch (e) {
    response
      .status(500)
      .send('Server error').end()
  }
})

const getArrivalTimes = (arrivals) => {
  const arrivalTimes = arrivals.map(item => {
    return {
      departureInMinutes: calculateMinutes(item),
      departureInSeconds: calculateSeconds(item),
      description: item.headsign,
      sign: item.trip.tripHeadsign,
      route: item.trip.routeShortName
    }
  }).filter(item => item.departureInSeconds >= 0)

  return arrivalTimes

}

const calculateMinutes = (time) => {
  const timeInMinutes = calculateSeconds(time) / 60
  return Math.round(timeInMinutes)
}

const calculateSeconds = (time) => {
  const currentTime = new Date().getTime()
  return Math.round((time.realtimeDeparture + time.serviceDay) - currentTime / 1000)
}

const getQueryData = (stopId) => `{      
  stop(id: "HSL:${stopId}") {          
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip{
          tripHeadsign
          routeShortName
        }   
    }
  }          
}`

module.exports = timetableRouter

