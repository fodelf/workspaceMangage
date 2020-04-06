/*
 * @Description: 控制器
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:43:57
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 17:11:17
 */
const workServer = require('../service/work.js')
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
 * @api {get} /api/getIndexCount
 * @apiName getIndexCount
 * @apiGroup home
 *
 *
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 * @apiSuccess {Number} componentCount 组件数量数量汇总.
 * @apiSuccess {Number} scriptCount 工具数量数量汇总.
 *
 */
async function getIndexCount(req, res) {
  try {
    let data = await workServer.getIndexCount()
    let resultEntity = data
    res.send({ ...result, resultEntity })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {get} /api/getProjectType
 * @apiName getProjectType
 * @apiGroup dictionary
 *
 */
async function getProjectType(req, res) {
  try {
    let data = await workServer.getProjectType()
    let resultEntity = data
    res.send({ ...result, resultEntity })
  } catch (error) {
    res.send(resultErr)
  }
}
module.exports = {
  getIndexCount,
  getProjectType
}
