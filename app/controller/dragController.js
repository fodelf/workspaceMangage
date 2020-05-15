/*
 * @Description: 控制器
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:43:57
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-15 09:02:44
 */
const url = require('url')
const dragServer = require('../service/drag.js')
const commonServer = require('../service/common.js')
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
const resultErr = {
  resultCode: 500,
  resultEntity: {},
  resultMes: '服务异常'
}
/**
 * @api {post} /api/getList 公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function _getList(req, res, tableName) {
  try {
    let data = await commonServer.queryCommonList(
      url.parse(req.url, true).query,
      tableName
    )
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectList 获取项目列表
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getPageList(req, res) {
  _getList(req, res, 'page')
}
async function deleteProject(req, res) {
  try {
    await commonServer.deleteByID(req.body.projectId, 'projectId', 'project')
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function insertPage(req, res) {
  try {
     let resultEntity = {
       templateId:await dragServer.insertPage(req.body)
     }
     res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getTemplateInfo(req, res) {
  try {
    let resultEntity = await dragServer.getTemplateInfo(req.body)
    resultEntity = resultEntity[0]
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}

module.exports = {
  getPageList,
  insertPage,
  deleteProject,
  getTemplateInfo
}