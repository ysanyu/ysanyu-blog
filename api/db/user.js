var { User } = require('./Model.js')

// 创建用户
const createUser = (userName, password, time) => {
  return new User({
    userName: userName,
    password: password,
    time: time
  }).save()
}

// 登录
const loginUser = (userName, password) => {
  return User.find({ _id: 'master', userName: userName, password: password })
}

// 修改密码
const upDatePassword = (userName, origin, change) => {
  return User.replaceOne(
    { _id: 'master', userName: userName, password: origin },
    { _id: 'master', userName: userName, password: change }
  )
}

module.exports = { createUser, findUser, loginUser, upDatePassword }
