const timetableRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const { cache , getCacheAsync, setCacheAsync } = require('../utils/cache')
const queryStop = require('./timetable-generic').queryStop


timetableRouter.get('/', (request, response) => {
  return response.status(200).send('Vaihtoehtoina ovat: /portti, /alepa, /kadetti ja /paattari').end()
})

timetableRouter.get('/:id', (request, response, next) => {
  response.express_redis_cache_name = `stop-${request.params.id}`
  next()
}, cache.route({ expire: 5 }), async (request, response) => {
  
  const id = request.params.id 
  console.log('GET /', id)

  const stopId = await getNonHumanStopId(id)

  console.log('STOP', stopId)
  console.log(getQueryPayload(stopId))

  try {

    let result = await axios({
      url: config.HSL_API_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      data: getQueryPayload(stopId)

    })

    console.log(result.data)
    const arrivals = result.data.data.stop.stoptimesWithoutPatterns

    
    const arrivalTimes = getArrivalTimes(arrivals, stopId)
    
    return response
      .status(200)
      .json(arrivalTimes)

  } catch (e) {    
    response
      .status(500)
      .send('Server error').end()
  }
})

const getNonHumanStopId = async (id) => {

  let stopId = await getCacheAsync(id)

  if(stopId) return stopId

  stopId = config.STOPS[id] //get stop id:s from a map
   
  if (!stopId) {
  
    let stop = await queryStop(id)

    console.log('Id', stopId)
    if (!stop) {
      return null
    } else {
      stopId = stop.id
      await setCacheAsync(id, stopId, 'EX', config.EXPIRATION )
    }    
  }

  return stopId
}

const getArrivalTimes = (arrivals, id) => {
  const arrivalTimes = arrivals.map(item => {
    return {
      departureInMinutes: calculateMinutes(item),
      departureInSeconds: calculateSeconds(item),
      description: item.headsign,
      sign: item.trip.tripHeadsign,
      route: item.trip.routeShortName,
      stopId: id,
      tripId: item.trip.semanticHash.split(':')[1]
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

const getQueryPayload = (stopId) => `{      
  stop(id: "${stopId}") {          
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
          semanticHash
        }   
    }
  }          
}`

module.exports = timetableRouter

