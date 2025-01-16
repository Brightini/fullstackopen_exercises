const unknownEndpoint = (request, response, next) => {
    response.status(404).send({
        error: 'Unknown endpoint'
    })
}

// const errorHandler = (error, request, response, next) => {
//     if (error.name === 'JsonWebTokenError') {
//         return response.status(401).json({ error: 'Invalid token '})
//     }
// }

module.exports = { unknownEndpoint }
