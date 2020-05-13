/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 22:21:31
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-13 15:57:29
 */
import request from '@/utils/request'

export function getProjectSum(params) {
  return request({
    url: '/api/getProjectSum',
    method: 'GET',
    params: params
  })
}
export function getProjectList(params) {
  return request({
    url: '/api/getProjectList',
    method: 'GET',
    params: params
  })
}
export function getProjectType(params) {
  return request({
    url: '/api/getProjectType',
    method: 'GET',
    params: params
  })
}
export function addProject(params) {
  return request({
    url: '/api/initNewProject',
    method: 'POST',
    params: params
  })
}
export function getTemList(params) {
  return request({
    url: '/api/template/queryTemplateList',
    method: 'GET',
    params: params
  })
}
export function deleteProject(params) {
  return request({
    url: '/api/project/deleteProject',
    method: 'POST',
    params: params
  })
}
export function updateProject(params) {
  return request({
    url: '/api/project/updateProject',
    method: 'POST',
    params: params
  })
}
export function action(params) {
  return request({
    url: '/api/project/action',
    method: 'POST',
    params: params
  })
}

