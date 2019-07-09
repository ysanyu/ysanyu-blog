var express = require('express')
var dayjs = require('dayjs')
var router = express.Router()
var { commonErr } = require('../err')
var {
  createBlog,
  findBlog,
  deleteBlog,
  whichBlog,
  upDateCount,
  upDateBlog,
  findUpBlog,
  findComBlog,
  upBlog
} = require('../db/blog')

/* GET users listing. */
// 创建博客
router.post('/write', function(req, res, next) {
  const time = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  const year = dayjs(new Date()).format('YYYY')
  const month = dayjs(new Date()).format('MMM')
  createBlog(
    req.body.author,
    req.body.title,
    req.body.tags,
    req.body.content,
    time,
    year,
    month
  )
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

// 更新博客
router.post('/update', function(req, res, next) {
  upDateBlog(req.body._id, req.body.title, req.body.tags, req.body.content)
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

// 读取博客
router.get('/read', function(req, res, next) {
  let data = []
  findUpBlog()
    .then(upData => {
      findComBlog()
        .then(comData => {
          data = upData.concat(comData)
          res.send({
            code: 0,
            list: data
          })
        })
        .catch(error => {
          res.send(commonErr)
        })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 博客置顶
router.post('/upBlog', function(req, res, next) {
  upBlog(req.body.author, req.body._id, req.body.up)
    .then(upData => {
      res.send({
        data: upData,
        code: 0,
        msg: '已置顶'
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 获取置顶
router.get('/up', function(req, res, next) {
  findUpBlog()
    .then(response => {
      res.send({
        code: 0,
        list: response
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 获取未置顶
router.get('/common', function(req, res, next) {
  let up = false
  findComBlog()
    .then(response => {
      res.send({
        code: 0,
        list: response
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 获取历史。安照 年=>月=>日 排序
router.get('/history', function(req, res, next) {
  findBlog()
    .then(docs => {
      let historyArr = []
      let yearObj = {}
      let monthObj = {}

      //当前循环的-年-月
      let yearNow = 0
      let monthNow = 0
      for (let i = 0, docLen = docs.length; docLen > i; i++) {
        //记录当前文章的时间-年-月
        let tplYear = docs[i].year
        let tplMonth = docs[i].month
        if (yearNow !== tplYear) {
          //保存上一年的年月数据,如果存在的话
          if (yearNow !== 0) {
            yearObj.data.push(monthObj)
            historyArr.push(yearObj)
          }
          //初始化
          yearNow = tplYear
          monthNow = tplMonth
          yearObj = {
            year: yearNow,
            data: []
          }
          monthObj = {
            month: monthNow,
            data: []
          }
          monthObj.data.push(docs[i])
          //判断是否为最后一个,如果是则保存月和年
          if (docLen == i + 1) {
            yearObj.data.push(monthObj)
            historyArr.push(yearObj)
          }
        } else {
          //在年中遍历
          if (tplMonth === monthNow) {
            //同月的情况
            monthObj.data.push(docs[i])
            if (docLen === i + 1) {
              yearObj.data.push(monthObj)
              historyArr.push(yearObj)
            }
          } else {
            //不同月的情况
            //保存上一个月的obj,(monthObj创建就会附加article数据)
            yearObj.data.push(monthObj)
            monthNow = tplMonth
            monthObj = {
              month: monthNow,
              data: []
            }
            monthObj.data.push(docs[i])
            if (docLen === i + 1) {
              yearObj.data.push(monthObj)
              historyArr.push(yearObj)
            }
          }
        }
      }
      res.send({
        code: 0,
        msg: '数据获取成功',
        data: historyArr
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 统计访问次数
router.get('/count', function(req, res, next) {
  whichBlog(req.query._id).then(whichData => {
    let count = whichData[0].count
    console.log('count', count++)
    upDateCount(req.query._id, count)
      .then(response => {
        console.log(response)
        res.send({
          code: 0,
          count: count,
          data: response
        })
      })
      .catch(error => {
        res.send(commonErr)
      })
  })
})

// 博客正文
router.get('/detail', function(req, res, next) {
  whichBlog(req.query._id)
    .then(response => {
      console.log(response)
      res.send({
        code: 0,
        blog: response[0],
        path: '/blog'
      })
    })
    .catch(error => {
      res.send(commonErr)
    })
})

// 删除博客
router.get('/delete', function(req, res, next) {
  deleteBlog(req.query._id)
    .then(deleteRes => {
      console.log(deleteRes)
      if (deleteRes.deletedCount === 1) {
        findBlog().then(response => {
          console.log(response)
          res.send({
            code: 0,
            deletedCount: deleteRes.deletedCount,
            msg: '删除成功',
            list: response
          })
        })
      } else {
        res.send({
          code: 1,
          msg: '删除失败',
          list: response
        })
      }
    })
    .catch(error => {
      res.send(commonErr)
    })
})

module.exports = router
