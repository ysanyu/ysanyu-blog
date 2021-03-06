/*
 *  数据库使用的mongodb
 */

// 引入mongoose
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog', function(err) {
  if (err) {
    console.log('连接失败')
  } else {
    console.log('连接成功')
  }
})

// 连接失败
mongoose.connection.on('error', function(err) {
  console.error('数据库链接失败:' + err)
})

// 连接成功
mongoose.connection.on('open', function() {
  console.log('数据库链接成功')
})

// 断开数据库
mongoose.connection.on('disconnected', function() {
  console.log('数据库断开')
})

// 将mongoose推出

module.exports = mongoose
