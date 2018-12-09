import request from 'supertest'
import app from '../src/app.js'

/**
 * Root
 */
describe('Test Root API', () => {
  test('Root API', async () => {
    const response = await request(app)
      .get('/api')

    expect(response.statusCode).toBe(200)
  })

  test('Async/Await Test API', async () => {
    const response = await request(app)
      .get('/api/async-await-test')

    expect(response.statusCode).toBe(200)
  })
})
