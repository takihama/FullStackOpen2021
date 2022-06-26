const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_user_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
    const user = new User({
      username: helper.initialUser.username,
      name: helper.initialUser.name,
      passwordHash: passwordHash
    })

    await user.save()
  })

  test('initial user is returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)

    const users = response.body.map(user => user.username)
    expect(users).toContain(helper.initialUser.username)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.auxUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.auxUser.username)
  })
})

describe('addition of a new user', () => {
  test('an invalid user returns error', async () => {
    await api
      .post('/api/users')
      .send(helper.auxInvalidUser)
      .expect(400)
  })

  test('creation fails with invalid password', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.auxInvalidPassoword)
      .expect(400)

    expect(response.body.error).toBe('password must have at least 3 characters')
  })

  test('creation fails with invalid username', async () => {
    await api
      .post('/api/users')
      .send(helper.auxInvalidUsername)
      .expect(400)
  })
})

// Close connection after all tests finished
afterAll(() => {
  mongoose.connection.close()
})