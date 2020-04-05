/*
 * @Description: 数据库交互
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:31:21
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 17:07:32
 */
const sd = require('silly-datetime')
const uuid = require('uuid')
const { sqliteDB } = require('../sql/initTable')
// 获取首页汇总
async function queryIndexCount() {
  var querySql = `select t1.projectCount,t2.templateCount,t3.componentCount ,t4.utilCount from (select count(*) projectCount from project) t1, (select count(*) templateCount from template) t2 ,(select count(*) componentCount from component) t3,(select count(*) scriptCount from script) t4`
  return await sqliteDB.queryData1(querySql)
}
// 项目类型字典项
async function queryProjectType() {
  var querySql = `SELECT * from ptype`
  return await sqliteDB.queryData1(querySql)
}
// 新增项目
async function newProject(data, callBack) {
  var tileData = [
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
  var insertTileSql =
    'insert into project(projectName,pathUrl,gitUrl,dec,type, keyword,templateUrl,creatTime,deleteFlag) values(?, ?, ?,?, ?, ?,?,?,?)'
  sqliteDB.insertData(insertTileSql, tileData, () => {
    callBack()
  })
}
// 获取项目列表
async function queryProjectList(data, callBack) {
  var type = data.type
  data.pageNum = data.pageNum ? data.pageNum : 1
  data.pageSize = data.pageSize ? data.pageSize : 10
  let n1 = (data.pageNum - 1) * parseInt(data.pageSize)
  let n2 = data.pageSize
  var querySql = `SELECT * ,COUNT(1) OVER() AS total from project  where ${
    type ? "type = '" + type + "' and" : ''
  } deleteFlag = 0 and keyword  LIKE '%${
    data.keyword ? data.keyword : ''
  }%' LIMIT ${n1},${n2}`
  sqliteDB.queryData(querySql, function(data) {
    callBack(data)
  })
}
// 获取项目汇总
async function querySum(tableName, callBack) {
  //var querySql =` SELECT * from (SELECT  value , COUNT(value) as count, label from   ptype  LEFT JOIN  project  ON project.type = ptype.value GROUP BY ptype.value) t1 ORDER BY t1.count  DESC`
  //var querySql = `SELECT count(p.type),distinct(p.type),distinct(t.label) from ptype as t,project as p where t.value = p.type`
  var querySql = `select t.value as type ,t.label ,count(p.type) as count from ptype as t left join ${tableName} as p on t.value=p.type group by t.value,t.label ORDER BY count  DESC;`
  console.log(querySql)
  sqliteDB.queryData(querySql, function(data) {
    console.log(data)
    callBack(data)
  })
}
// 新增项目模板
async function insertTemplate(data, callBack) {
  var tileData = [
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
    'insert into template(templateName,gitUrl,dec,type, keyword,decImg,creatTime,deleteFlag) values(?,?,?,?,?,?,?,?)'
  sqliteDB.insertData(insertSql, tileData, () => {
    callBack()
  })
}
// 获取项目模板列表
async function queryTemplateList(data, callBack) {
  var type = data.type
  data.pageNum = data.pageNum ? data.pageNum : 1
  data.pageSize = data.pageSize ? data.pageSize : 10
  let n1 = (data.pageNum - 1) * parseInt(data.pageSize)
  let n2 = data.pageSize
  var querySql = `SELECT * ,COUNT(1) OVER() AS total from template  where ${
    type ? "type = '" + type + "' and " : ''
  }deleteFlag = 0 and keyword  LIKE '%${
    data.keyword ? data.keyword : ''
  }%' LIMIT ${n1},${n2}`
  console.log(querySql)
  sqliteDB.queryData(querySql, function(data) {
    callBack(data)
  })
}
// 获取项目汇总
async function queryTemplateSum(callBack) {
  var querySql = `SELECT type , COUNT(*) as count, label from  template   LEFT JOIN  ptype  ON template.type = ptype.value GROUP BY template.type`
  console.log(querySql)
  sqliteDB.queryData(querySql, function(data) {
    callBack(data)
  })
  // await sqliteDB.queryData(querySql
}
// 获取项目模板列表
async function queryCommonList(data, tableName, callBack) {
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
  console.log(querySql)
  sqliteDB.queryData(querySql, function(data) {
    callBack(data)
  })
}
// 新增项目
async function insertComponent(data, callBack) {
  var tileData = [
    [
      data.componentName,
      data.gitUlr,
      data.dec,
      data.decImg,
      data.type,
      data.keyword,
      sd.format(new Date(), 'YYYY-MM-DD'),
      0,
      'userId'
    ]
  ]
  var insertTileSql =
    'insert into component(componentName,gitUlr,dec,decImg,type, keyword,creatTime,deleteFlag,userId) values(?, ?, ?,?, ?, ?,?,?,?)'
  sqliteDB.insertData(insertTileSql, tileData, () => {
    callBack()
  })
}
//查询用户
async function queryUser(callBack) {
  var querySql = `SELECT * from user`
  sqliteDB.queryData(querySql, function(data) {
    callBack(data)
  })
}
// 新增用户
async function insertUser(callBack) {
  var tileData = [
    [uuid.v1(), 'pym', '111111', '', sd.format(new Date(), 'YYYY-MM-DD')]
  ]
  var insertSql =
    'insert into user(userId,userName,password,headerImg,creatTime) values(?,?,?,?,?)'
  sqliteDB.insertData(insertSql, tileData, () => {
    callBack()
  })
}
module.exports = {
  queryIndexCount,
  queryProjectType,
  newProject,
  queryProjectList,
  querySum,
  insertTemplate,
  queryTemplateList,
  queryTemplateSum,
  queryCommonList,
  insertComponent,
  queryUser,
  insertUser
}
