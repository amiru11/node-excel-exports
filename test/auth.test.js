import request from 'supertest'
import models from '../src/models'
import app from '../src/app.js'

const newUserForTest = {
  id: 44441,
  username: 'hoonch1@gmail.com',
  password: '1234'
}

const newUserForSignup = {
  id: 44442,
  username: 'hoonch2@gmail.com',
  password: '1234'
}

beforeAll(async () => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  const response = await request(app).post('/api/signup').send(newUserForTest)
  return response
});

afterAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  return Promise.all([
    models.User.destroy({
      where: {
        id: 44441
      }
    }),
    models.User.destroy({
      where: {
        id: 44442
      }
    })
  ])
})

/**
 * Auth
 */
describe('Test Auth API', () => {
  test('Sign Up: Success', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send(newUserForSignup)

    expect(response.statusCode).toBe(200)
  })

  test('Sign Up: Failed - Empty Fields', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send()

    expect(response.statusCode).toBe(500)
  })

  test('Log In', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: newUserForTest.username,
        password: newUserForTest.password
      })

    expect(response.statusCode).toBe(200)
  })
})
