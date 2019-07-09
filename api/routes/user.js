var express = require('express')
var router = express.Router()
var { commonErr } = require('../err')
var { createUser, findUser, loginUser, upDatePassword } = require('../db/user')

// 注册
router.post('/register', function(req, res, next) {
  const time = new Date()
  createUser(req.body.userName, req.body.password, time)
    .then(response => {
      res.send({
        code: 0,
        msg: '登陆成功',
        path: '/admin'
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

//修改密码
router.post('/changePass', function(req, res, next) {
  console.log(req.body)
  upDatePassword(req.body.userName, req.body.origin, req.body.change)
    .then(response => {
      if (response.n === 1) {
        res.send({
          code: 0,
          msg: '密码修改成功！',
          path: '/'
        })
      }
    })
    .catch(error => {
      res.send(commonErr)
    })
})

//登录
router.post('/login', function(req, res, next) {
  console.log(req.body.userName)
  console.log(req.body.password)
  findUser(req.body.userName, req.body.password)
    .then(response => {
      if (response.length === 0) {
        res.send({
          code: 1, //0为已创建 （登录）,1为未创建账号,2为账号或者密码不正确
          msg: '未找到账号，是否立即创建？'
        })
      } else {
        loginUser(req.body.userName, req.body.password)
          .then(findData => {
            console.log('loginUser', findData)
            if (findData.length === 0) {
              res.send({
                code: 2,
                msg: '账号或者密码不正确'
              })
            } else {
              res.send({
                code: 0,
                msg: '登陆成功',
                path: '/admin'
              })
            }
          })
          .catch(errData => {
            res.send(commonErr)
          })
      }
    })
    .catch(error => {
      res.send(commonErr)
    })
})

module.exports = router
