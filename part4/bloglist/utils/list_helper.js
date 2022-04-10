const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  })
}

const mostFamousAuthor = (authors) => {
  if (authors.length === 0) return null

  return authors.reduce((prev, curr) => {
    return prev.blogs > curr.blogs ? prev : curr
  })
}

const mostBlogs = (blogs) => {
  return mostFamousAuthor(blogs.reduce((prev, curr) => {
    if (!prev.find(blog => blog.author === curr.author)) {
      prev.push({
        author: curr.author,
        blogs: 1
      })
    }
    else {
      prev[prev.findIndex(o => o.author === curr.author)].blogs++
    }
    return prev
  }, []))
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}