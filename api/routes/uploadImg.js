/**
 * 这里我是用的七牛云的cdn，毕竟腾讯oss买不起
 */

var express = require('express')
var router = express.Router()
let multipart = require('connect-multiparty')
// 表单处理器
let multipartMiddleware = multipart()
// 读写文件模块
var fs = require('fs')
// 七牛云模块
var qn = require('qn')
// 空间名
var bucket = 'blog'
// 七牛云配置
var client = qn.create({
  // 秘钥在控制模板->个人中心->密钥管理中可以看到
  accessKey: '你的ak',
  secretKey: '你的密钥',
  // 空间名
  bucket: bucket,
  // 这个是你要生成的前缀（你的外链地址，可以在空间中查看）
  origin: 'http://cdn.xxx.com'
})

// 上传图片
router.post('/', multipartMiddleware, (req, res, next) => {
  let imgInfo = req.files.image
  delete imgInfo.headers
  let arr = imgInfo.type.split('/')
  let suffix = arr[arr.length - 1]
  let filename = `blogUploads/${Date.parse(new Date())}.${suffix}`
  client.uploadFile(imgInfo.path, { key: filename }, function(err, result) {
    if (err) {
      console.log('uploadimg_cdn_fail==>', err)
      res.send({
        code: 1,
        msg: '上传失败'
      })
    }
    console.log(`uploadimg_cdn_succ ==>${result.url}`)
    res.send({
      code: 0,
      msg: '上传成功',
      data: result.url
    })
  })
})

module.exports = router
