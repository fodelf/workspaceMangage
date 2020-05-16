/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:49:30
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 14:27:13
 */
var { DB } = require('./sqlite.js')
const initData = require('./initData.js')
const path = require('path')
var file = path.join(__dirname,'work.db')
var sqliteDB = new DB.SqliteDB(file)
// 用户表
var createUserTableSql =
  'create table if not exists user(uid INTEGER PRIMARY KEY AUTOINCREMENT,userId TEXT,userName TEXT, password TEXT,headerImg TEXT,createTime BLOB);'
// 模板表
var createTemplateTableSql =
  'create table if not exists template(templateId INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT, templateName TEXT, gitUrl TEXT, dec TEXT,decImg TEXT,type TEXT,createTime BLOB,modifyTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 项目表
var createProjectTableSql =
  'create table if not exists project(projectId INTEGER PRIMARY KEY AUTOINCREMENT, projectName TEXT,fileName TEXT,pathUrl TEXT, gitUrl TEXT,dec TEXT, type TEXT,keyword TEXT,decImg TEXT,templateUrl TEXT,createTime BLOB,deleteFlag INTEGER,actions BLOB,userId TEXT);'
// 组件表
var createComponentTableSql =
  'create table if not exists component(componentId INTEGER PRIMARY KEY AUTOINCREMENT, componentName TEXT, gitUrl TEXT, dec TEXT,decImg TEXT,type TEXT,keyword TEXT,createTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 工具表
var createUtilTableSql =
  'create table if not exists util(utilId INTEGER PRIMARY KEY AUTOINCREMENT, utilName TEXT, gitUrl TEXT, dec TEXT,decImg TEXT,type TEXT,createTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 脚本表
var createScriptTableSql =
  'create table if not exists script(scriptId INTEGER PRIMARY KEY AUTOINCREMENT, scriptName TEXT, scriptContent BLOB , createTime BLOB, deleteFlag INTEGER, scriptType TEXT);'
//项目字典表
var createPdecTableSql =
  'create table if not exists ptype(ptypeId INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT, value TEXT);'
//待办表
var createToDoListSql =
  'create table if not exists todo(todoId INTEGER PRIMARY KEY AUTOINCREMENT,taskDec TEXT,deleteFlag INTEGER,createTime BLOB);'
//动态列表
var createActiveSql =
  'create table if not exists active(activeId INTEGER PRIMARY KEY AUTOINCREMENT,active TEXT,userId TEXT,createTime BLOB);'
//页面列表
var createPageSql =
  'create table if not exists page(pageId INTEGER PRIMARY KEY AUTOINCREMENT,templateId TEXT,templateName TEXT,templateInfo BLOB,userId TEXT,createTime BLOB,modifyTime BLOB, deleteFlag INTEGER,keyword TEXT);'

function initPtype() {
  var data = initData.projectType
  var insertSql = 'insert into ptype (label,value) values(?, ?)'
  sqliteDB.insertData(insertSql, data)
}
function initScript () {
  var data = initData.script
  var insertSql =
    'insert into script(scriptName,scriptContent,scriptType,createTime,deleteFlag) values(?, ?, ?,?,?)'
  sqliteDB.insertData(insertSql, data)
}
async function initTable() {
  await sqliteDB.createTable(createUserTableSql)

  await sqliteDB.createTable(createTemplateTableSql)

  await sqliteDB.createTable(createComponentTableSql)

  await sqliteDB.createTable(createProjectTableSql)

  await sqliteDB.createTable(createUtilTableSql)

  await sqliteDB.createTable(createPdecTableSql)

  await sqliteDB.createTable(createScriptTableSql)

  await sqliteDB.createTable(createToDoListSql)

  await sqliteDB.createTable(createActiveSql)

  await sqliteDB.createTable(createPageSql)
  var querySql = `SELECT * from ptype`
  let data = await sqliteDB.queryData(querySql)
  var querySqlScript = `SELECT * from script`
  let script = await sqliteDB.queryData(querySqlScript)
  if (data.length == 0) {
    initDec()
  }
  if (script.length == 0) {
    initScript()
  }
}
async function initDec() {
  initPtype()
}

module.exports = {
  initTable,
  sqliteDB
}
