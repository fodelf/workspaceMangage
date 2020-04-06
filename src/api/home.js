/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 19:52:07
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 16:43:38
 */
import request from '@/utils/request'

export function getIndexCount() {
  return request({
    url: '/api/home/getIndexCount',
    method: 'GET',
  })
}

export function getTodoList() {
  return request({
    url: '/api/home/queryTodoList',
    method: 'GET',
  })
}

export function insertTask() {
  return request({
    url: '/api/home/insertTodoList',
    method: 'POST',
  })
}
