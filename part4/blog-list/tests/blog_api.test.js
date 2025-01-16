const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property is named "id"', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    blogs.forEach(blog => {
        assert('id' in blog, 'Blog object is missing title property')
    })
})

test('new blog can be added', async () => {
    const newBlog = {
        title: 'A new blog post to be added',
        author: 'Newman Blog',
        url: 'www.newman.org',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDatabase()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(content => content.title)
    assert(contents.includes('A new blog post to be added'))
})

test('missing "like" property defaults to zero', async () => {
    const newBlog = {
        title: 'A new blog post to be added',
        author: 'Solomon Grande',
        url: 'www.solgrande.org',
    }

    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    const addedBlog = blogsAtEnd.find(blog => blog.id === postResponse.body.id)

    assert.strictEqual(addedBlog.likes, 0)
})

test('verify missing "title" or "url" property', async () => {
    const newBlog = {
        author: 'Solomon Grande',
        likes: 3201
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

describe('delete a blog', () => {
    test('success with statuscode 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDatabase()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDatabase()
        const ids = blogsAtEnd.map(r => r.id)
        assert(!ids.includes(blogToDelete.id))
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
    test('failed with statuscode of 400 for invalid id', async () => {
        const invalidID = '5a3d5da59070081a82a3445'

        await api
            .delete(`/api/blogs/${invalidID}`)
            .expect(400)
    })
})

describe.only('update a blog', () => {
    test('success with statuscode of 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDatabase()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 10230

        const updatedResult = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
        
        assert.deepStrictEqual(updatedResult.body, blogToUpdate)
    })

    test('failure with statuscode 400 if id is invalid', async () => {
        const invalidID = '5a3d5da59070081a82a3445'
        const blogsAtStart = await helper.blogsInDatabase()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 10230

        await api
            .put(`/api/blogs/${invalidID}`)
            .send(blogToUpdate)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})