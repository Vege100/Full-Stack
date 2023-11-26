const listHelper = require('../utils/list_helper')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

describe('totalLikes', () => {
    test('empty is 0', () => {
      const blogs = [];
      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(0);
    });
  
    test('return likes of one blog', () => {
      const blog = [blogs[0]];
      const result = listHelper.totalLikes(blog);
      expect(result).toBe(7);
    });
  
    test('useampi blogi palauttaa kaikkien tykkäysten summan', () => {
      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(36);
    });
  });

  describe('favorite blog', () => {
    test('empty return null', () => {
      const blogs = [];
      const result = listHelper.favoriteBlog(blogs);
      expect(result).toBe(null);
    })
    test('one returns same blog', () => {
      const blog = [blogs[0]];
      const result = listHelper.favoriteBlog(blog);
      expect(result).toBe(blogs[0]);
    })
    test('useampi blogi palauttaa tykätyimmän', () => {
      const result = listHelper.favoriteBlog(blogs);
      expect(result).toBe(blogs[2]);
    });
  })

  describe('Who has most blogs and how many', () => {
    test('zero blogs return null', () => {
      const blog = []
      const result = listHelper.mostBlogs(blog)
      expect(result).toBe(null)
    })
    test('one return author and number 1', () => {
      const blog = [blogs[0]]
      const result = listHelper.mostBlogs(blog)
      expect(result).toEqual({ author: blog[0].author, blogs: 1 });
    })
    test('many blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: "Robert C. Martin" , blogs: 3 })
    }) 
  })

  describe('Which author has most liked blog and how many likes', () => {
    test('zero blog returns null', () => {
      const blog = []
      result = listHelper.mostLikes(blog)
      expect(result).toBe(null)
    })
    test('one return author and likes', () => {
      const blog = [blogs[0]]
      const result = listHelper.mostLikes(blog)
      expect(result).toEqual({ author: blog[0].author, likes: 7 });
    })
    test('many blogs', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: "Edsger W. Dijkstra" , likes: 12 })
    }) 
  })