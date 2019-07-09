var express = require('express')
var dayjs = require('dayjs')
var router = express.Router()
var { commonErr } = require('../err')
var {
  writeAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor
} = require('../db/author')

// 个人信息创建
router.post('/write', function(req, res, next) {
  const time = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  writeAuthor(req.body.author, time, req.body.content)
    .then(response => {
      res.send({
        code: 0,
        msg: '已保存',
        path: '/article'
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 个人信息更新
router.post('/update', function(req, res, next) {
  console.log(req.body)
  updateAuthor(req.body.author, req.body.content)
    .then(response => {
      res.send({
        code: 0,
        msg: '已修改',
        path: '/article'
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 获取个人信息
router.get('/read', function(req, res, next) {
  readAuthor()
    .then(response => {
      res.send({
        code: 0,
        data: response
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 删除
router.get('/delete', function(req, res, next) {
  deleteAuthor()
    .then(response => {
      res.send({
        code: 0,
        data: response
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

module.exports = router
