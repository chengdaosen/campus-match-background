import axios from '../http/request'

export const getPost = (params = {}) => {
  return axios({
    url: '/posts',
    method: 'post',
    data: params,
  })
}
