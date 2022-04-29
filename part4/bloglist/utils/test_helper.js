const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Fullstackopen rocks',
    author: 'Daniel Calderon',
    url: 'http://nonexistentblog.com',
    likes: 0,
  },
  {
    title: 'Fullstackopen is not so good',
    author: 'Calderon Daniel',
    url: 'http://nonexistentblog.com',
    likes: 4
  }
]

const auxBlog = {
  title: 'Checking post',
  author: 'Daniel',
  url: 'http://checkingpost.com',
  like: 7
}

const nonExistingId = async () => {
  const blog = new Note({ title: 'willremovethissoon', author: 'remover', url: 'removeLink', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, auxBlog, nonExistingId, blogsInDb
}