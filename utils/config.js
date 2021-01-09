require('dotenv').config()

let PORT = process.env.PORT || 3000

let REDIS_HOST = process.env.REDIS_HOST
let REDIS_URL = process.env.REDIS_URL
let REDIS_PORT = process.env.REDIS_PORT || 6379

if (REDIS_URL) {
  arr = REDIS_URL.split(":")
  REDIS_PORT = arr.pop()
  REDIS_HOST = arr.join(":")
}

const STOPS = {
  portti: 1301451,
  alepa: 1301453,
  paattari: 1301455
}

const HSL_API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

module.exports = {
  STOPS, PORT, HSL_API_URL, REDIS_HOST, REDIS_PORT
}
