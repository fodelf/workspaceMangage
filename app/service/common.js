/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-31 21:56:54
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-15 20:15:37
 */
const fs = require('fs')
const path = require('path')
const workDao = require('../dao/workDao.js')
const config = require('../config/config')
const UUID = require('uuid')
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
// 查询汇总
async function querySum(tableName) {
  return await workDao.querySum(tableName)
}
// 判断文件路径是否存在
async function isFileExist(req, res) {
  fs.exists(req.body.filePath, function(ex) {
    let resultEntity = true
    if (ex) {
      res.send({ ...result, resultEntity })
    } else {
      resultEntity = false
      res.send({ ...result, resultEntity })
    }
  })
}
// 上传文件
async function upload(req, res) {
  let name = UUID.v1() + path.extname(req.files['file']['originalFilename'])
  let filePath = path.join(path.resolve(__dirname,'..'), 'static', 'img', name)
  fs.readFile(req.files['file'].path, function(err, data) {
    fs.writeFile(filePath, data, function(err) {
      if (err) {
        console.log(err)
        res.send(resultErr)
      } else {
        let resultEntity = `${config.url}/img/`+ name
        res.send({ ...result, resultEntity })
      }
    })
  })
}

// 获取公共列表
async function queryCommonList(data, tableName) {
  return await workDao.queryCommonList(data, tableName)
}
// 获取用户
async function queryUser() {
  let data = await workDao.queryUser()
  console.log(data)
  if (data.length == 0) {
    await workDao.insertUser()
    return queryUserAgain()
  } else {
    return data
  }
}
async function queryUserAgain() {
  return new Promise(function(resolve) {
    setTimeout(async () => {
      resolve(await workDao.queryUser())
    })
  })
}
async function queryAll(tableName) {
  return await workDao.queryAll(tableName)
}
// 删除数据公共方法
async function deleteByID(id, tableID, tableName) {
  console.log('sss')
  return await workDao.deleteByID(id, tableID, tableName)
}
module.exports = {
  querySum,
  isFileExist,
  upload,
  queryCommonList,
  queryUser,
  queryAll,
  deleteByID
}
