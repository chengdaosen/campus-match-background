import request from '../http/request'

export const adminLogin = (params = {}) => {
  return request({
    url: '/admin',
    method: 'post',
    data: params,
  })
}
