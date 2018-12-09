import request from 'supertest'
import models from '../../src/models'
import app from '../../src/app.js'

const newUser = {
  id: 44445,
  username: 'hoonch5@gmail.com',
  password: '1234'
}

beforeAll(() => {
  return request(app).post('/api/signup').send(newUser)
})

afterAll(() => {
  return models.User.destroy({
    where: { id: newUser.id }
  })
})

/**
 * Users
 */
describe('Test Users API', () => {
  test('GET list of users by Admin', async () => {
    const response = await request(app)
      .get('/api/admin/users')

    expect(response.statusCode).toBe(200)
  })

  test('PUT an user by Admin', async () => {
    const response = await request(app)
      .put(`/api/admin/users/${newUser.id}`)
      .send({
        nickname: '춘식'
      })

    expect(response.statusCode).toBe(200)
  })

  test('DELETE an user by Admin', async () => {
    const response = await request(app)
      .delete(`/api/admin/users/${newUser.id}`)

    expect(response.statusCode).toBe(200)
  })
})
