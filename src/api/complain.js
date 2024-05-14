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
export const deletePost = (params = {}) => {
  return request({
    url: '/complain/delete',
    method: 'delete',
    data: params,
  })
}
export const recordTotal = (params = {}) => {
  return request({
    url: '/complain',
    method: 'post',
    data: params,
  })
}
export const addRepotedTotal = (params = {}) => {
  return request({
    url: '/complain/add',
    method: 'post',
    data: params,
  })
}
