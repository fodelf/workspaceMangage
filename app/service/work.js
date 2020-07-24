/*
 * @Description: server层
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:46:24
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-23 20:39:41
 */
const workDao = require('../dao/workDao.js')
const common = require('./common.js')
// const exec = require('child_process').exec
// const { nodeModules } = require('../utils/gitDown.js')
// var UUID = require('uuid')
// const url = require('url')
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
// 获取首页计数明显
async function getIndexCount() {
  return await workDao.queryIndexCount()
}

// 获取项目分类字典项
async function getProjectType() {
  return await workDao.queryProjectType()
}
// 新增项目
async function initNewProject(data) {
  return await workDao.initNewProject(data)
}
// 获取项目列表
async function getProjectList(req, res) {
  common.queryCommonList(req, res, 'project')
}
// 获取项目汇总列表
async function getProjectSum(req, res) {
  common.querySum('project', res)
}
// 新增模板
async function newTemplate(data) {
  return await workDao.insertTemplate(data)
}
// 获取项目列表
async function queryTemplateList(req, res) {
  common.queryCommonList(req, res, 'template')
}
// 获取模板汇总
async function queryTemplateSum(req, res) {
  common.querySum('template', res)
}
// 获取组件列表
async function queryComponentList(req, res) {
  common.queryCommonList(req, res, 'component')
}
// 获取组件汇总
async function queryComponentSum(req, res) {
  common.querySum('component', res)
}
// 获取项目汇总
async function queryProjectById(req, res) {
  const callBack = function(data) {
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({ ...result, resultEntity })
  }
  workDao.queryTemplateSum(callBack)
}

// 新增组件
async function insertComponent(data) {
  return await workDao.insertComponent(data)
}
// 新增待办列表
async function insertTodoList(data) {
  return await workDao.insertTodoList(data)
}
// 获取脚本列表
async function queryScriptList(data) {
  return await workDao.queryScriptList(data)
}
// 新增组件
async function insertScript(data) {
  return await workDao.insertScript(data)
}
// 修改组件
async function updateScript(data) {
  return await workDao.updateScript(data)
}
// 修改模板
async function updateTemp(data) {
  return await workDao.updateTemp(data)
}
//修改项目
async function updateProject(data) {
  return await workDao.updateProject(data)
}
//修改项目
async function updateComp(data) {
  return await workDao.updateComp(data)
}
//修改项目
async function changeTodoList(data) {
  return await workDao.changeTodoList(data)
}
// 获取个人动态列表
async function getPersonActive(data) {
  return await workDao.getPersonActive(data)
}
// 查询脚本
async function queryScriptById(data) {
  return await workDao.queryScriptById(data)
}
// 新增告警
async function insertWarning(data) {
  return await workDao.insertWarning(data)
}
// 查询新增告警
async function queryWarningList() {
  return await workDao.queryWarningList()
}
module.exports = {
  queryWarningList,
  insertWarning,
  getIndexCount,
  getProjectType,
  getProjectList,
  getProjectSum,
  initNewProject,
  newTemplate,
  queryTemplateList,
  queryTemplateSum,
  queryProjectById,
  queryComponentSum,
  queryComponentList,
  insertComponent,
  insertTodoList,
  queryScriptList,
  insertScript,
  updateScript,
  updateTemp,
  updateProject,
  updateComp,
  changeTodoList,
  getPersonActive,
  queryScriptById
}
