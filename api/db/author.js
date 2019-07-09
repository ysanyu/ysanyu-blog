var { Author } = require('./Model.js')

// 创建个人信息
const writeAuthor = (author, time, content) => {
  return new Author({
    author: author,
    content: content,
    time: time
  }).save()
}

// 读取个人信息
const readAuthor = () => {
  return Author.find()
}

// 更新个人信息
const updateAuthor = (author, content) => {
  return Author.updateOne(
    { _id: 'author', author: author },
    { $set: { content: content } }
  )
}

// 删除个人信息
const deleteAuthor = () => {
  return Author.deleteOne({ _id: 'author' })
}

module.exports = {
  writeAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor
}
