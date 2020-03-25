/*
 * @Description: server层
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:46:24
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-22 17:38:36
 */
const workDao = require('../dao/workDao.js')
const initData = require('../sql/initData.js')
const exec = require('child_process').exec
const {nodeModules} = require('../utils/gitDown.js');
const url=require('url');
const result = {
  resultCode: 200,
  resultEntity: {},
  resultMes: 'success'
}
// 获取首页计数明显
async function getIndexCount (req, res) {
  const callBack = function (data) {
    let resultEntity = data
    res.send(result)
  }
  workDao.queryIndexCount(callBack)
}

// 获取项目分类字典项
async function getProjectType (req, res) {
  const callBack = function (data) {
    result.resultEntity = data
    res.send({ ...result, resultEntity })
  }
  workDao.queryProjectType(callBack)
}
// 新增项目
async function newProject (req, res) {
  let body = req.body
  const callBack = function (data) {
    res.send(result)
  }
  workDao.newProject(body, callBack)
}
// 初始新增项目
async function initNewProject (req, res) {
  res.send(result)
  const callBackFun = function (data) {
    console.log('下载成')
    let filePath = 'workspaceMangage'
    let workerProcess = exec(`cd  ${filePath}
    npm i
    `, {})
    workerProcess.on('close', function (code) {
      res.send(result)
    })
  }
  // 获取当前路径
  let filePath = __dirname
  let workerProcess = exec(`cd  ${filePath}
  `, {})
  workerProcess.on('close', function (code) {
    const gitdownFunc = nodeModules();
    gitdownFunc(['https://github.com/fodelf/workspaceMangage'],callBackFun);
  })
}
// 获取项目列表
async function getProjectList (req, res) {
  const callBack = function (data) {
    let resultEntity = {
      total:data[0]?data[0]['total']:0,
      list:data
    }
    res.send({ ...result, resultEntity })
  }
  console.log(url.parse(req.url,true).query)
  workDao.queryProjectList(url.parse(req.url,true).query, callBack)
}
// 获取项目汇总列表
async function getProjectSum (req, res) {
  const callBack = function (data) {
    let projectType = initData.projectType
    projectType.forEach(element => {
      if (!data.some((item) => {
        return item.type == element[1]
      })) {
        let child = {
          "type": element[1],
          "count": 0,
          "label": element[0]
        }
        data.push(child)
      }
    });
    let totalSum = 0
    data.forEach((item)=>{
      totalSum+= item.count
    })
    let resultEntity = {
        total: totalSum,
        list: data
    }
    res.send({ ...result, resultEntity })
  }
  workDao.queryProjectSum(callBack)
}
module.exports = {
  getIndexCount,
  getProjectType,
  newProject,
  getProjectList,
  getProjectSum,
  initNewProject
}