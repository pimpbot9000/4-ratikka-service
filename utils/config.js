require('dotenv').config()

let ENV = process.env.NODE_ENV || 'production'
let PORT = process.env.PORT || 3000

let REDIS_URL = process.env.REDIS_URL
const STOP_CACHE_EXP = 60000
const ENDPOINT_CACHE_EXP = 5

const STOPS = {
  portti: 'HSL:1301451',
  alepa: 'HSL:1301453',
  kadetti: 'HSL:1301455',
  paattari: 'HSL:1301456',
  arabianranta: 'HSL:1230407'
}

const HSL_API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

module.exports = {
  STOPS, PORT, HSL_API_URL, REDIS_URL, ENV, STOP_CACHE_EXP, ENDPOINT_CACHE_EXP
}
