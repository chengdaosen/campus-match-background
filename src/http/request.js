// request.js

import instance from './index'

const axios = ({ method, url, data, config }) => {
  method = method.toLowerCase()
  if (!['get', 'post', 'delete', 'put'].includes(method)) {
    console.error('未知的 method：' + method)
    return false
  }

  const options = {
    params: method === 'get' ? data : undefined,
    ...config,
  }

  return instance[method](url, method === 'get' ? undefined : data, options)
}

export default axios
