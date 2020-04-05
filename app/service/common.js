/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-31 21:56:54
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 10:04:44
 */
const fs = require('fs')
const url = require('url')
const path = require('path')
const workDao = require('../dao/workDao.js')
const UUID = require('uuid')
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
async function querySum(tableName, res) {
  const callBack = function(data) {
    let totalSum = 0
    data.forEach(item => {
      totalSum += item.count
    })
    let resultEntity = {
      total: totalSum,
      list: data
    }
    res.send({ ...result, resultEntity })
  }
  workDao.querySum(tableName, callBack)
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
  console.log(req.files['file']['originalFilename'])
  console.log(req.files['file'])
  let name = UUID.v1() + path.extname(req.files['file']['originalFilename'])
  let filePath = path.join(process.cwd(), 'static', 'source', 'img', name)
  fs.readFile(req.files['file'].path, function(err, data) {
    fs.writeFile(filePath, data, function(err) {
      if (err) {
        console.log(err)
      } else {
        let resultEntity = 'http://192.168.0.100:8081/source/img/' + name
        res.send({ ...result, resultEntity })
      }
    })
  })
}

// 判断文件路径是否存在
async function queryCommonList(req, res, tableName) {
  const callBack = function(data) {
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({ ...result, resultEntity })
  }
  workDao.queryCommonList(url.parse(req.url, true).query, tableName, callBack)
}
// 获取用户
async function getUser(req, res) {
  const callBack = function(data) {
    if (data.length == 0) {
      const insertCallBack = function() {
        const callBack = function(data) {
          let resultEntity = data
          res.send({ ...result, resultEntity })
        }
        workDao.queryUser(callBack)
      }
      workDao.insertUser(insertCallBack)
    } else {
      let resultEntity = data
      res.send({ ...result, resultEntity })
    }
  }
  workDao.queryUser(callBack)
}
module.exports = {
  querySum,
  isFileExist,
  upload,
  queryCommonList,
  getUser
}
