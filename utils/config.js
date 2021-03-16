require('dotenv').config()

let ENV = process.env.NODE_ENV || 'production'
let PORT = process.env.PORT || 3000

let REDIS_URL = process.env.REDIS_URL

const STOPS = {
  portti: 1301451,
  alepa: 1301453,
  kadetti: 1301455,
  paattari: 1301456 
}

const HSL_API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

module.exports = {
  STOPS, PORT, HSL_API_URL, REDIS_URL, ENV
}
