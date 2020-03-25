/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:49:30
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 21:07:57
 */
var { DB } = require('./sqlite.js')
const initData = require('./initData.js')
var file = 'work.db'
var sqliteDB = new DB.SqliteDB(file)
// 用户表
var createUserTableSql =
  'create table if not exists user(userId INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, password TEXT);'
// 模板表
var createTemplateTableSql =
  'create table if not exists template(templateId INTEGER PRIMARY KEY AUTOINCREMENT, templateName TEXT, gitUlr TEXT, dec TEXT,decImg TEXT,type TEXT,creatTime BLOB,deleteFlag INTEGER,userId INTEGER);'
// 项目表
var createProjectTableSql =
'create table if not exists project(projectId INTEGER PRIMARY KEY AUTOINCREMENT, projectName TEXT, pathUrl TEXT, gitUrl TEXT,dec TEXT, type TEXT,keyword TEXT ,creatTime BLOB,deleteFlag INTEGER);'
// 组件表
var createComponentTableSql =
  'create table if not exists component(componentId INTEGER PRIMARY KEY AUTOINCREMENT, componentName TEXT, gitUlr TEXT, dec TEXT,decImg TEXT,type TEXT,creatTime BLOB,deleteFlag INTEGER,userId INTEGER);'
// 工具表
var createUtilTableSql =
  'create table if not exists util(utilId INTEGER PRIMARY KEY AUTOINCREMENT, utilName TEXT, gitUlr TEXT, dec TEXT,decImg TEXT,type TEXT,creatTime BLOB,deleteFlag INTEGER,userId INTEGER);'  

//项目字典表
var createPdecTableSql =
  'create table if not exists ptype(id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT, value TEXT);'

function initPtype(){
  var data = initData.projectType
var insertTileSql = 'insert into ptype (label,value) values(?, ?)'
sqliteDB.insertData(insertTileSql, data)
}


function initTable() {
  sqliteDB.createTable(createUserTableSql)

  sqliteDB.createTable(createTemplateTableSql)

  sqliteDB.createTable(createComponentTableSql)

  sqliteDB.createTable(createProjectTableSql)

  sqliteDB.createTable(createUtilTableSql)

  sqliteDB.createTable(createPdecTableSql)
  var querySql =`SELECT * from ptype`
  sqliteDB.queryData(querySql, function(data) {
    if(data.length == 0){
     initDec()
    }
  })
}
function initDec(){
  initPtype()
}

module.exports = {
  initTable,
  sqliteDB
}
