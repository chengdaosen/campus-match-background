import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token') || ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
