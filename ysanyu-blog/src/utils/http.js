import { postData, getParams, upload } from './methods'
import { Url } from './urls'

export const postLogin = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.login, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const postRegister = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.register, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const changePass = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.changePass, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const writeBlog = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.write, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const updateBlog = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.updateBlog, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const upBlog = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.upBlog, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const readBlog = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.read, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const historyBlog = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.history, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const getCount = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.count, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const whichBlog = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.whichBlog, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const deleteBlog = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.delete, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const uploadImg = payload => {
  return new Promise((resolve, reject) => {
    upload(Url.uploadImg, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const getAuthor = payload => {
  return new Promise((resolve, reject) => {
    getParams(Url.readAuthor, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const updateAuthor = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.updateAuthor, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const writeAuthor = payload => {
  return new Promise((resolve, reject) => {
    postData(Url.writeAuthor, payload)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
