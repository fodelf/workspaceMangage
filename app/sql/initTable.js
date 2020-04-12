/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:49:30
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 15:34:45
 */
var { DB } = require('./sqlite.js')
const initData = require('./initData.js')
var file = 'work.db'
var sqliteDB = new DB.SqliteDB(file)
// 用户表
var createUserTableSql =
  'create table if not exists user(uid INTEGER PRIMARY KEY AUTOINCREMENT,userId TEXT,userName TEXT, password TEXT,headerImg TEXT,creatTime BLOB);'
// 模板表
var createTemplateTableSql =
  'create table if not exists template(templateId INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT, templateName TEXT, gitUrl TEXT, dec TEXT,decImg TEXT,type TEXT,creatTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 项目表
var createProjectTableSql =
  'create table if not exists project(projectId INTEGER PRIMARY KEY AUTOINCREMENT, projectName TEXT, pathUrl TEXT, gitUrl TEXT,dec TEXT, type TEXT,keyword TEXT,templateUrl TEXT,creatTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 组件表
var createComponentTableSql =
  'create table if not exists component(componentId INTEGER PRIMARY KEY AUTOINCREMENT, componentName TEXT, gitUlr TEXT, dec TEXT,decImg TEXT,type TEXT,keyword TEXT,creatTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 工具表
var createUtilTableSql =
  'create table if not exists util(utilId INTEGER PRIMARY KEY AUTOINCREMENT, utilName TEXT, gitUlr TEXT, dec TEXT,decImg TEXT,type TEXT,creatTime BLOB,deleteFlag INTEGER,userId TEXT);'
// 脚本表
var createScriptTableSql =
  'create table if not exists script(scriptId INTEGER PRIMARY KEY AUTOINCREMENT, scriptName TEXT, scriptContent BLOB , creatTime BLOB, deleteFlag INTEGER);'
//项目字典表
var createPdecTableSql =
  'create table if not exists ptype(id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT, value TEXT);'
//待办表
var createToDoListSql =
  'create table if not exists todo(doId INTEGER PRIMARY KEY AUTOINCREMENT,taskDec TEXT,deleteFlag INTEGER,creatTime BLOB);'

function initPtype() {
  var data = initData.projectType
  var insertSql = 'insert into ptype (label,value) values(?, ?)'
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
  var querySql = `SELECT * from ptype`
  let data = await sqliteDB.queryData(querySql)
  if (data.length == 0) {
    initDec()
  }
}
async function initDec() {
  initPtype()
}

module.exports = {
  initTable,
  sqliteDB
}
