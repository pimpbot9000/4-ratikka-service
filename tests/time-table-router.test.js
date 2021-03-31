const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const keys = [
  'departureInMinutes',  
  'departureInSeconds',
  // ...
  'stopId',
  'tripId'
]

describe('Test timetable endpoint', () => {
  test('Tests work!', () => {
    expect(42).toBe(42)
  })

  test('Api returns OK with predefined stop', async () => {
    await api
      .get('/api/portti')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Api returns a list longer than one', async () => {

    const result = await api.get('/api/portti')
    expect(result.body.length > 0).toBe(true)

    const first = result.body[0]
    keys.forEach( key => expect(key in first).toBe(true))     
    

  })

  test('Api returns OK with ANY stop with human readable ID of type Hxxx', async () => {
    await api
      .get('/api/H0122')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Api returns returns a list longer than one with ANY stop with id Hxxx', async () => {

    const result = await api.get('/api/H0122')
    expect(result.body.length > 0).toBe(true)

    const first = result.body[0]
    keys.forEach( key => expect(key in first).toBe(true))
  })



})

