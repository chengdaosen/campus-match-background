import request from '../http/request'

export const addNoticeApi = (params = {}) => {
  return request({
    url: '/notice',
    method: 'post',
    data: params,
  })
}

export const getAllNotice = (params = {}) => {
  return request({
    url: '/notice',
    method: 'get',
    params,
  })
}
export const setNotice = (params = {}) => {
  return request({
    url: '/notice/status',
    method: 'post',
    data: params,
  })
}
export const deleteNotice = (params = {}) => {
  return request({
    url: '/notice/delete',
    method: 'delete',
    data: params,
  })
}
