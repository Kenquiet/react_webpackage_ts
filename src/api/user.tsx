import request from '../utils/request'

export function reqUserInfo(data: any) {
  return request({
    url: '/userInfo',
    method: 'post',
    data
  })
}
