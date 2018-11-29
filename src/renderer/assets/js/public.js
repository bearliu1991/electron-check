// 此处放置公用方法
import axios from 'axios'

// get请求
function httpGet (url) {
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(res => {
        resolve(res)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// post请求
function httpPost (url, options) {
  return new Promise(function (resolve, reject) {
    axios.post(url, options)
      .then(res => {
        resolve(res)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 多重请求
function httpAll (reqFun1, reqFun2) {
  return new Promise(function (resolve, reject) {
    axios.all([reqFun1, reqFun2])
      .then(axios.spread(function (acct, perms) {
        resolve(acct, perms)
      }))
      .catch(function (error) {
        throw error
      })
  })
}

export default {
  httpGet,
  httpPost,
  httpAll
}
