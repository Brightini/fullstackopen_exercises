const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'First Book Title',
        author: 'Johnny Bravo',
        url: 'www.johnnybravo.com',
        likes: 100
    },
    {
        title: 'Second Book Title',
        author: 'Franklin Brown',
        url: 'www.frankbrown.com',
        likes: 354
    }
]

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDatabase }