const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const keys = [
  'departureInMinutes',
  'departureInSeconds',
  // ... lazyness struck!
  'stopId',
  'tripId'
]

describe('Test timetable endpoint', () => {

  test('Tests work! Yay!', () => {
    expect(42).toBe(42)
  })

  test('Api returns 404 when stop is not found', async () => {
    await api
      .get('/api/doesnotexist')
      .expect(404)      
  })

  test('Api returns 200 with right content type for predefined stop', async () => {
    await api
      .get('/api/portti')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Api returns a list of departures longer than one for predefined stop and\
   contains a correct set of keys', async () => {

    const result = await api.get('/api/portti')
    expect(result.body.length > 0).toBe(true)

    const first = result.body[0]
    keys.forEach(key => expect(key in first).toBe(true))
    
  })

  test('Api returns 200 with right content type by human readable ID of type Hxxx', async () => {
    await api
      .get('/api/H0122')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Api returns returns a list of departures by human readable ID and contains\
   a correct set of keys', async () => {

    const result = await api.get('/api/H0122')
    expect(result.body.length > 0).toBe(true)

    const first = result.body[0]
    keys.forEach(key => expect(key in first).toBe(true))

  })

})

