import request from '../http/request'

export const getUsers = (params = {}) => {
  return request({
    url: '/allUsers',
    method: 'post',
    data: params,
  })
}
