import request from '../http/request'
export const setBlacklist = (params = {}) => {
  return request({
    url: '/blacklist',
    method: 'post',
    data: params,
  })
}
export const getBlacklist = (params = {}) => {
  return request({
    url: '/blacklist',
    method: 'get',
    params,
  })
}
