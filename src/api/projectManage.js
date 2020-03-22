/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 22:21:31
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-22 17:14:29
 */
import request from '@/utils/request'

export function getProjectSum (params) {
  return request({
    url: '/api/getProjectSum',
    method: 'GET',
    params: params
  })
}
export function getProjectList (params) {
  return request({
    url: '/api/getProjectList',
    method: 'GET',
    params: params
  })
}