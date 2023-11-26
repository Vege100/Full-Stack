const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
      let likes = 0
      blogs.map(blog => likes += blog.likes)
      return likes
    }
    
    
    const favoriteBlog = (blogs) => {
        if (blogs.length === 0) return null
        return blogs.reduce((prev, current) =>
        prev.likes > current.likes ? prev : current)
    }

    const mostBlogs = (blogs) => {
        if (blogs.length === 0) {
          return null 
        }
      
        const blogCounts = {}
        let maxBlogsAuthor = ''
        let maxBlogs = 0
      
        blogs.forEach(blog => {
          const author = blog.author
          blogCounts[author] = (blogCounts[author] || 0) + 1
      
          if (blogCounts[author] > maxBlogs) {
            maxBlogs = blogCounts[author]
            maxBlogsAuthor = author
          }
        })
      
        return {
          author: maxBlogsAuthor,
          blogs: maxBlogs
        }
      }

    const mostLikes = (blogs) => {
        if (blogs.length === 0) return null

        const mostLiked = blogs.reduce((prev, current) =>
            prev.likes > current.likes ? prev : current
            )
        return {
            author: mostLiked.author,
            likes: mostLiked.likes
        }

    }

    module.exports = {
      dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
    }