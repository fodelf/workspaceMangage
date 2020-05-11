/*
 * @Description: 数据库交互
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:31:21
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-11 15:54:21
 */
const sd = require('silly-datetime')
const uuid = require('uuid')
const { sqliteDB } = require('../sql/initTable')
// 新增脚本
async function insertPage(data) {
  var insertData = [
    [
      uuid.v4(),
      data.templateName,
      data.templateInfo,
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ]
  ]
  var insertSql =
    'insert into page(templateId,templateName,templateInfo,createTime,modifyTime,deleteFlag) values( ?, ?, ?, ?, ?, ?)'
  return await sqliteDB.insertData(insertSql, insertData)
}
//查询用户
async function getTemplateInfo(data) {
  var querySql = `SELECT * from page where templateId = '${data.templateId}'`
  return await sqliteDB.queryData(querySql)
}
module.exports = {
  insertPage,
  getTemplateInfo
}
