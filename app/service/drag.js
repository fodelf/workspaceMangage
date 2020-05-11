/*
 * @Description: server层
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:46:24
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-11 15:49:08
 */
const dragDao = require('../dao/dragDao.js')
// 新增组件
async function insertPage(data) {
  return await dragDao.insertPage(data)
}
// 获取页面详情
async function getTemplateInfo(data) {
  return await dragDao.getTemplateInfo(data)
}
module.exports = {
  insertPage,
  getTemplateInfo
}
