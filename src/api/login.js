import axios from '../http/request'

export const adminLogin = (params = {}) => {
  return axios({
    url: '/admin',
    method: 'post',
    data: params,
  })
}
