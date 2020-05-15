/*
 * @Description: 数据库交互
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:31:21
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-15 09:19:50
 */
const sd = require('silly-datetime')
const uuid = require('uuid')
const { sqliteDB } = require('../sql/initTable')
// 新增脚本
async function insertPage(data) {
  // eslint-disable-next-line no-prototype-builtins
  if(data.hasOwnProperty('templateId')){
    var deleteSql = `update page set templateInfo = '${data.templateInfo}' where templateId = '${data.templateId}'`
    await sqliteDB.updateData(deleteSql)
    return data.templateId
  }else{
    let templateId = uuid.v4()
    var insertData = [
      [
        templateId,
        data.templateName,
        data.templateInfo,
        sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        0
      ]
    ]
    var insertSql =
      'insert into page(templateId,templateName,templateInfo,createTime,modifyTime,deleteFlag) values( ?, ?, ?, ?, ?, ?)'
    await sqliteDB.insertData(insertSql, insertData)
    return templateId
  }
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
