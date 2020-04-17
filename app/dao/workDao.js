/*
 * @Description: 数据库交互
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:31:21
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-17 09:22:34
 */
const sd = require('silly-datetime')
const uuid = require('uuid')
const { sqliteDB } = require('../sql/initTable')
// 获取首页汇总
async function queryIndexCount() {
  var querySql = `select t1.projectCount,t2.templateCount,t3.componentCount ,t4.scriptCount from 
  (select count(*) projectCount from project where deleteFlag = 0 ) t1, 
  (select count(*) templateCount from template where deleteFlag = 0) t2 ,
  (select count(*) componentCount from component where deleteFlag = 0) t3,
  (select count(*) scriptCount from script where deleteFlag = 0) t4`
  return await sqliteDB.queryData(querySql)
}
// 项目类型字典项
async function queryProjectType() {
  var querySql = `SELECT * from ptype`
  return await sqliteDB.queryData(querySql)
}
// 新增项目
async function initNewProject(data) {
  var insertData = [
    [
      data.projectName,
      data.pathUrl,
      data.gitUrl,
      data.dec,
      data.type,
      data.keyword,
      data.templateUrl,
      sd.format(new Date(), 'YYYY-MM-DD'),
      0
    ]
  ]
  var insertTileSql = `insert into project ( projectName,pathUrl,gitUrl,dec,type,
      keyword,templateUrl,createTime,deleteFlag ) values (?,?,?,?,?,?,?,?,?)`
  return await sqliteDB.insertData(insertTileSql, insertData)
}
// 获取项目汇总
async function querySum(tableName) {
  var querySql = `select t.value as type ,t.label ,count(p.type) as count from ptype as t left join ${tableName} as p on t.value=p.type and p.deleteFlag = 0 group by t.value,t.label ORDER BY count  DESC;`
  // var querySql = `SELECT * from ptype`
  return await sqliteDB.queryData(querySql)
}
// 新增项目模板
async function insertTemplate(data) {
  var insertData = [
    [
      data.templateName,
      data.gitUrl,
      data.dec,
      data.type,
      data.keyword,
      data.decImg,
      sd.format(new Date(), 'YYYY-MM-DD'),
      0
    ]
  ]
  var insertSql =
    'insert into template(templateName,gitUrl,dec,type, keyword,decImg,createTime,deleteFlag) values(?,?,?,?,?,?,?,?)'
  return await sqliteDB.insertData(insertSql, insertData)
}
// 获取列表公共方法
async function queryCommonList(data, tableName) {
  var type = data.type
  data.pageNum = data.pageNum ? data.pageNum : 1
  data.pageSize = data.pageSize ? data.pageSize : 10
  let n1 = (data.pageNum - 1) * parseInt(data.pageSize)
  let n2 = data.pageSize
  var querySql = `SELECT * ,COUNT(1) OVER() AS total from  ${tableName}  where ${
    type ? "type = '" + type + "' and " : ''
  }deleteFlag = 0 and keyword  LIKE '%${
    data.keyword ? data.keyword : ''
  }%' LIMIT ${n1},${n2}`
  return await sqliteDB.queryData(querySql)
}
// 获取列表公共方法
async function queryScriptList(data) {
  data.pageNum = data.pageNum ? data.pageNum : 1
  data.pageSize = data.pageSize ? data.pageSize : 10
  let n1 = (data.pageNum - 1) * parseInt(data.pageSize)
  let n2 = data.pageSize
  var querySql = `SELECT * ,COUNT(1) OVER() AS total from script where deleteFlag = 0 and scriptName  LIKE '%${
    data.scriptName ? data.scriptName : ''
  }%' LIMIT ${n1},${n2}`
  return await sqliteDB.queryData(querySql)
}
// 新增组件
async function insertComponent(data) {
  var insertData = [
    [
      data.componentName,
      data.gitUrl,
      data.dec,
      data.decImg,
      data.type,
      data.keyword,
      sd.format(new Date(), 'YYYY-MM-DD'),
      0,
      'userId'
    ]
  ]
  var insertSql =
    'insert into component(componentName,gitUrl,dec,decImg,type, keyword,createTime,deleteFlag,userId) values(?, ?, ?,?, ?, ?,?,?,?)'
  return await sqliteDB.insertData(insertSql, insertData)
}
//查询用户
async function queryUser() {
  var querySql = `SELECT * from user`
  return await sqliteDB.queryData(querySql)
}
// 新增用户
async function insertUser() {
  var insertData = [
    [uuid.v1(), 'pym', '111111', 'xxx', sd.format(new Date(), 'YYYY-MM-DD')]
  ]
  var insertSql =
    'insert into user (userId,userName,password,headerImg,createTime) values(?,?,?,?,?)'
  return await sqliteDB.insertData(insertSql, insertData)
}
async function queryAll(tableName) {
  var querySql = `SELECT * from ${tableName} DESC`
  return await sqliteDB.queryData(querySql)
}
// 新增待办
async function insertTodoList(data) {
  var insertData = [
    [data.taskDec, 0, sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss')]
  ]
  var insertSql =
    'insert into todo(taskDec,deleteFlag,createTime) values(?, ?, ?)'
  return await sqliteDB.insertData(insertSql, insertData)
}
// 新增脚本
async function insertScript(data) {
  var insertData = [
    [
      data.scriptName,
      data.scriptContent,
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ]
  ]
  var insertSql =
    'insert into script(scriptName,scriptContent,createTime,deleteFlag) values(?, ?, ?,?)'
  return await sqliteDB.insertData(insertSql, insertData)
}

// 删除记录
async function deleteByID(id, tableID, tableName) {
  var deleteSql = `update ${tableName} set deleteFlag = 1 where ${tableID} = ${id}`
  return await sqliteDB.deleteData(deleteSql)
}

// 修改脚本
async function updateScript(data) {
  var deleteSql = `update script set scriptContent = '${data.scriptContent}',scriptName = '${data.scriptName}'  where scriptId = ${data.scriptId}`
  return await sqliteDB.updateData(deleteSql)
}
//修改模板
async function updateTemp(data) {
  var deleteSql = `update template set keyword = '${data.keyword}',templateName = '${data.templateName}',
  gitUrl = '${data.gitUrl}', dec = '${data.dec}',
  decImg = '${data.decImg}', type = '${data.type}'
  where templateId = ${data.templateId}`
  return await sqliteDB.updateData(deleteSql)
}
// 修改项目
async function updateProject(data) {
  var deleteSql = `update project set projectName = '${
    data.projectName
  }',pathUrl = '${data.pathUrl}',
  gitUrl = '${data.gitUrl}', dec = '${data.dec}',
  templateUrl = '${data.templateUrl ? data.templateUrl : ''}', type = '${
    data.type
  }'
  where projectId = ${data.projectId}`
  return await sqliteDB.updateData(deleteSql)
}
//修改组件
async function updateComp(data) {
  var deleteSql = `update component set keyword = '${data.keyword}',componentName = '${data.componentName}',
  gitUrl = '${data.gitUrl}', dec = '${data.dec}',
  decImg = '${data.decImg}', type = '${data.type}'
  where componentId = ${data.componentId}`
  return await sqliteDB.updateData(deleteSql)
}
module.exports = {
  queryIndexCount,
  queryProjectType,
  initNewProject,
  querySum,
  insertTemplate,
  queryCommonList,
  insertComponent,
  queryUser,
  insertUser,
  queryAll,
  insertTodoList,
  queryScriptList,
  insertScript,
  deleteByID,
  updateScript,
  updateTemp,
  updateProject,
  updateComp
}
