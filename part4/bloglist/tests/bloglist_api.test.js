const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// Reset test database and load it with default data
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog identifier is the id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.auxBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(helper.auxBlog.title)
  })

  test('a blog missing likes is added with 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(helper.auxBlogMissingLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const missingLikesBlog = blogsAtEnd.find(b => b.title === helper.auxBlogMissingLikes.title)
    expect(missingLikesBlog.likes).toBe(0)
  })

  test('an invalid blog returns error', async () => {
    await api
      .post('/api/blogs')
      .send(helper.auxInvalidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('update of a blog', () => {
  test('an existing blog can be updated with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(helper.auxUpdateBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd[0]
    expect(blogUpdated.likes).toBe(helper.auxUpdateBlog.likes)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

// Close connection after all tests finished
afterAll(() => {
  mongoose.connection.close()
})