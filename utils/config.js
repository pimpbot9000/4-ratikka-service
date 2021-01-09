require('dotenv').config()

let PORT = process.env.PORT || 3000

const REDIS_HOST = process.env.REDIS_HOST

const STOPS = {
  portti: 1301451,
  alepa: 1301453,
  paattari: 1301455
}

const HSL_API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

module.exports = {
  STOPS, PORT, HSL_API_URL, REDIS_HOST
}