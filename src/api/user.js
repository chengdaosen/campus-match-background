import axios from '../http/request'

export const getUsers = (params = {}) => {
  return axios({
    url: '/allUsers',
    method: 'post',
    data: params,
  })
}
