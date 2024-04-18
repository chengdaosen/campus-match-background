// http/index.js

import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

// 创建 axios 的一个实例
const instance = axios.create({
  // baseURL: import.meta.env.VITE_APP_URL, // 接口统一域名
  baseURL: 'http://localhost:3000', // 接口统一域名
  timeout: 6000, // 设置超时
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded', // 传参方式表单
    'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
  },
})

let loading
let requestCount = 0

const showLoading = () => {
  if (requestCount === 0 && !loading) {
    loading = ElLoading.service({
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
      spinner: 'el-icon-loading',
    })
  }
  requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount === 0) {
    loading.close()
  }
}

instance.interceptors.request.use(
  (config) => {
    showLoading()
    const token = window.localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  (error) => {
    hideLoading() // 在请求拦截器中也需要关闭 loading 动画
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    hideLoading()
    return response
  },
  (error) => {
    hideLoading()
    let message = '请求失败'
    const status = error.response && error.response.status
    if (status) {
      switch (status) {
        case 400:
        case 401:
          message = error.response.data.error || '请求错误'
          break
        case 404:
          message = '请求地址出错'
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误!'
          break
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
          message = '服务不可用'
          break
        default:
          message = '请求失败'
      }
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default instance
