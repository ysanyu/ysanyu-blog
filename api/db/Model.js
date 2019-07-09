var mongoose = require('./db.js')

// 模型骨架
var userSchema = new mongoose.Schema({
  _id: { type: String, unique: true, default: 'master' }, //创建唯一用户
  userName: { type: String, unique: true },
  password: String,
  time: String
})

var blogSchema = new mongoose.Schema({
  author: String, //作者
  title: String, //标题
  time: String, //时间
  count: Number, //阅读数
  tags: String, //标签
  content: String, //正文
  year: String,
  month: String,
  created: String,
  up: { type: Boolean, default: false }
})

var authorSchema = new mongoose.Schema({
  _id: { type: String, unique: true, default: 'author' },
  author: String, //作者
  time: String, //时间
  content: String
})

// 由schema构造生成Model
var User = mongoose.model('user', userSchema)
var Blog = mongoose.model('blog', blogSchema)
var Author = mongoose.model('author', authorSchema)

module.exports = { User, Blog, Author }
