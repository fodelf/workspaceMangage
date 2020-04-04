/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-31 21:56:54
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-02 15:04:08
 */
const fs = require('fs')
const workDao = require('../dao/workDao.js')
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
async function querySum (tableName, res) {
  const callBack = function (data) {
    let totalSum = 0
    data.forEach((item) => {
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
async function isFileExist(req,res){
  fs.exists(req.body.filePath, function(ex) {
    let resultEntity = true
  if (ex) {
    res.send({...result,resultEntity});
  } else {
    resultEntity = false
    res.send({...result,resultEntity});
  }
});
}
module.exports = {
  querySum,
  isFileExist
}