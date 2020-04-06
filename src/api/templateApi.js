/*
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 11:15:29
 * @LastEditors: pym
 * @LastEditTime: 2020-04-05 17:40:31
 */
import request from '@/utils/request'

export function getTempSum(params) {
  return request({
    url: '/api/template/queryTemplateSum',
    method: 'GET',
    params: params,
  })
}

export function addNewTemp(params) {
  return request({
    url: '/api/template/newTemplate',
    method: 'POST',
    params: params,
  })
}

export function getTempCard(params) {
  return request({
    url: '/api/template/queryTemplateList',
    method: 'GET',
    params: params,
  })
}
