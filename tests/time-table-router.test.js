const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe(' sddsd ', () => {
  test('Tests work!', () => {
    expect(42).toBe(42)
  })

  test('Api returns OK with correct Content-Type', async () => {
    await api
      .get('/api/portti')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Api returns a list longer than one', async () => {

    const result = await api
      .get('/api/portti')

    expect(result.body.length > 1).toBe(true)

    const first = result.body[0]

    expect('stopId' in first).toBe(true)
    expect('tripId' in first).toBe(true)
  })

})