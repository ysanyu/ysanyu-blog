import { Url } from './urls'
import axios from 'axios'
import Qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

export const getParams = (url, params) => {
  return axios({
    method: 'get',
    url: Url.baseURL + url,
    params: params
  })
}

export const postData = (url, data) => {
  return axios({
    method: 'post',
    url: Url.baseURL + url,
    data: Qs.stringify(data)
  })
}

export const upload = (url, data) => {
  return axios({
    method: 'post',
    url: Url.baseURL + url,
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
