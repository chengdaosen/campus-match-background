import request from '../http/request'

export const getComplain = (params = {}) => {
  return request({
    url: '/complain',
    method: 'get',
    params,
  })
}
export const deleteComplain = (params = {}) => {
  return request({
    url: '/delete',
    method: 'post',
    data: params,
  })
}
