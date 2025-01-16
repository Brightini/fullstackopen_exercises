const express = require('express')
const blogRouter = express.Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) =>{
  const blogs = await Blog
    .find({}).populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs)
  })

const getToken = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
}

blogRouter.post('/', async (request, response) => {
 const body = request.body
 const decodedToken = jwt.verify(getToken(request), process.env.SECRET)
 if (!decodedToken.id) {
  return response.status(401).json({
    error: 'Invalid token'
  })
 }
 const user = await User.findById(decodedToken.id)

 const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
  user: user.id
 })

 const savedBlog = await blog.save()
 user.blogs = user.blogs.concat(savedBlog._id)
 await user.save()

 response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedBlog)
  } catch(error) {
    return response.status(400).json({
      error: error.message
    })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    return response.status(400).json({
      error: error.message
  })
  }
})

module.exports = blogRouter