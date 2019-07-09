var { Blog } = require('./Model.js')

// 创建博客
const createBlog = (author, title, tags, content, time, year, month) => {
  return new Blog({
    author: author, //作者
    title: title, //标题
    tags: tags, //标签
    content: content, //正文
    time: time,
    count: 0,
    year: year,
    month: month,
    created: `${year}&${month}`,
    up: false
  }).save()
}

// 全部数据
const findBlog = () => {
  return Blog.find().sort({ _id: -1 })
}

// 置顶数据
const findUpBlog = () => {
  return Blog.find({ up: true }).sort({ _id: 1 })
}

// 设置置顶
const upBlog = (author, _id, up) => {
  return Blog.update(
    { author: author, _id: _id },
    { $set: { up: up } },
    { multi: true }
  )
}

// 未置顶数据
const findComBlog = () => {
  return Blog.find({ up: false }).sort({ _id: -1 })
}

// 博客详情
const whichBlog = data => {
  return Blog.find({ _id: data })
}

// 删除博客
const deleteBlog = data => {
  return Blog.deleteOne({ _id: data })
}

// 伪统计人数(没有使用ip确定点击人数，只是点击count++)
const upDateCount = (_id, count) => {
  return Blog.update({ _id: _id }, { $set: { count: count } }, { multi: true })
}

// 更新博客
const upDateBlog = (_id, title, tags, content) => {
  return Blog.update(
    { _id: _id },
    { $set: { title: title, tags: tags, content, content } },
    { multi: false }
  )
}

module.exports = {
  createBlog,
  findBlog,
  deleteBlog,
  whichBlog,
  upDateCount,
  upDateBlog,
  updateYear,
  findUpBlog,
  findComBlog,
  upBlog
}
