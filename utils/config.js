require('dotenv').config()

let PORT = process.env.PORT || 3000

const STOPS = {
  portti: 1301451,
  alepa: 1301453,
  paattari: 1301455
}

const API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

module.exports = {
  STOPS, PORT, API_URL
}