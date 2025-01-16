const dummy = (blogs) => {
    if (blogs) return 1
}

const totalLikes = (list) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return list.length === 0
        ? 0
        : list.reduce(reducer, 0)
}

const favouriteBlog = (list) => {
    const objectWithHighestLikes = (maxObject, obj) => {
        return obj.likes > maxObject.likes ? obj : maxObject
    }

    return list.length === 0
        ? null
        : list.reduce(objectWithHighestLikes)
}

module.exports = { dummy, totalLikes, favouriteBlog }
