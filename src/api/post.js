import request from '../http/request'

export const getPost = (params = {}) => {
  return request({
    url: '/posts',
    method: 'post',
    data: params,
  })
}
