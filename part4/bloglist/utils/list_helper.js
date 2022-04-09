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

module.exports = {
  totalLikes,
  favoriteBlog
}