/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:44:42
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-14 11:00:17
 */
var fs = require('fs')
var sqlite3 = require('sqlite3').verbose()
var DB = DB || {}
DB.SqliteDB = function(file) {
  DB.db = new sqlite3.Database(file)
  DB.exist = fs.existsSync(file)
  if (!DB.exist) {
    console.log('Creating db file!')
    fs.openSync(file, 'w')
  }
}

DB.printErrorInfo = function(err) {
  console.log('Error Message:' + err.message + ' ErrorNumber:' + err.no)
}

DB.SqliteDB.prototype.createTable = function(sql) {
  return new Promise(function(resolve, reject) {
    DB.db.serialize(function() {
      DB.db.run(sql, function(err) {
        if (null != err) {
          DB.printErrorInfo(err)
          reject(new Error(err.message))
          return
        } else {
          resolve()
        }
      })
    })
  })
}

DB.SqliteDB.prototype.insertData = async function(sql, objects) {
  console.log(sql)
  console.log(JSON.stringify(objects))
  return new Promise(function(resolve, reject) {
    DB.db.serialize(function(err) {
      var stmt = DB.db.prepare(sql)
      for (var i = 0; i < objects.length; ++i) {
        stmt.run(objects[i])
      }
      stmt.finalize()
      if (err) {
        DB.printErrorInfo(err)
        reject(new Error(err.message))
      } else {
        resolve()
      }
    })
  })
}

DB.SqliteDB.prototype.queryData = async function(sql) {
  console.log(sql)
  return new Promise(function(resolve, reject) {
    DB.db.all(sql, function(err, rows) {
      if (err) {
        DB.printErrorInfo(err)
        reject(new Error(err.message))
      } else {
        console.log(JSON.stringify(rows))
        resolve(rows)
      }
    })
  })
}
DB.SqliteDB.prototype.deleteData = function(sql) {
  console.log(sql)
  return new Promise(function(resolve, reject) {
    DB.db.run(sql, function(err) {
      if (null != err) {
        DB.printErrorInfo(err)
        reject(new Error(err.message))
      } else {
        resolve()
      }
    })
  })
}
DB.SqliteDB.prototype.executeSql = function(sql) {
  DB.db.run(sql, function(err) {
    if (null != err) {
      DB.printErrorInfo(err)
    }
  })
}

DB.SqliteDB.prototype.close = function() {
  DB.db.close()
}

/// export SqliteDB.

// exports.SqliteDB = DB.SqliteDB
module.exports = {
  DB
}
