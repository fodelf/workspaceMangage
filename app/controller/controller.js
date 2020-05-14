/*
 * @Description: 控制器
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:43:57
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-14 15:15:12
 */
const url = require('url')
const fs = require('fs')
const sd = require('silly-datetime')
const shell = require('shelljs')
const os = require('os')
const path = require('path')
const iconv = require('iconv-lite')
const workServer = require('../service/work.js')
const commonServer = require('../service/common.js')
const {
  formatTime
} = require('../utils/formatTime.js')
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
/**
 * @api {post} /api/getList 公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function _getList(req, res, tableName) {
  try {
    let data = await commonServer.queryCommonList(
      url.parse(req.url, true).query,
      tableName
    )
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectSum 获取项目汇总公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function _getSum(req, res, tableName) {
  try {
    let data = await commonServer.querySum(tableName)
    let totalSum = 0
    data.forEach(item => {
      totalSum += item.count
    })
    let resultEntity = {
      total: totalSum,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {get} /api/getIndexCount 获取首页列表
 * @apiGroup home
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 * @apiSuccess {Number} componentCount 组件数量数量汇总.
 * @apiSuccess {Number} scriptCount 脚本数量数量汇总.
 */
async function getIndexCount(req, res) {
  try {
    let data = await workServer.getIndexCount()
    let resultEntity = data[0]
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {get} /api/getProjectType 获取项目字典表
 * @apiGroup DEC
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getProjectType(req, res) {
  try {
    let data = await workServer.getProjectType()
    let resultEntity = data
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function initNewProject(req, res) {
  try {
    fs.exists(req.body.pathUrl, async function(ex) {
      if (ex) {
        await workServer.initNewProject(req.body)
        res.send(result)
      } else {
        let resultMes = '文件路径不存在'
        res.send({ ...resultErr, resultMes })
      }
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectList 获取项目列表
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getProjectList(req, res) {
  // _getList(req, res, 'project')
  try {
    let data = await commonServer.queryCommonList(
      url.parse(req.url, true).query,
      'project'
    )
    // console.log(data)
    data.map(item =>{
      item.actions = JSON.parse(item.actions)
      item['action'] = 1
      item['param']  =''
      return item
    })
    console.log(data)
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectSum 获取项目汇总
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getProjectSum(req, res) {
  _getSum(req, res, 'project')
}
/**
 * @api {post} /api/getProjectSum 获取项目汇总公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function newTemplate(req, res) {
  try {
    req.body.decImg = path.basename(req.body.decImg);
    await workServer.newTemplate(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getList 获取模板列表
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryTemplateList(req, res) {
  try {
    let data = await commonServer.queryCommonList(
      url.parse(req.url, true).query,
      'template'
    )
    data.map(item => {
      let decImg = `${global.url}/img/` + item.decImg
      item.decImg = decImg
      return item
    })
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/queryTemplateSum 获取模板汇总
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryTemplateSum(req, res) {
  _getSum(req, res, 'template')
}
/**
 * @api {post} /api/getList 获取组件列表
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryComponentList(req, res) {
  _getList(req, res, 'component')
}
/**
 * @api {post} /api/queryComponentSum 获取模板汇总
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryComponentSum(req, res) {
  _getSum(req, res, 'component')
}
/**
 * @api {post} /api/insertComponent 新增组件
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function insertComponent(req, res) {
  try {
    await workServer.insertComponent(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/queryUser 新增组件
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryUser(req, res) {
  try {
    let data = await commonServer.queryUser()
    let resultEntity = data[0]
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getList 获取组件列表
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function queryTodoList(req, res) {
  let list = await commonServer.queryAll('todo')
  list.map(item => {
    item['time'] = formatTime(item.createTime)
    item['checked'] = item.deleteFlag == 1
    return item
  })
  let resultEntity = list
  res.send({
    ...result,
    resultEntity
  })
}
/**
 * @api {post} /api/getProjectSum 获取项目汇总公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function insertTodoList(req, res) {
  try {
    await workServer.insertTodoList(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectSum 获取项目汇总公共方法
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getPersonActive(req, res) {
  try {
    let resultEntity = await workServer.getPersonActive(req.body)
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {get} /api/script/queryScriptList 获取首页列表
 * @apiGroup home
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 * @apiSuccess {Number} componentCount 组件数量数量汇总.
 * @apiSuccess {Number} scriptCount 脚本数量数量汇总.
 */
async function queryScriptList(req, res) {
  try {
    let data = await workServer.queryScriptList(url.parse(req.url, true).query)
    let resultEntity = {
      total: data[0] ? data[0]['total'] : 0,
      list: data
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function insertScript(req, res) {
  try {
    await workServer.insertScript(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function actionScript(req, res) {
  console.log(req.body.scriptContent)
  res.send(result)
  try {
    let type = os.type()
    switch (type) {
      case 'Darwin':
      case 'Linux':
        shell.exec(req.body.scriptContent)
        break
      case 'Windows_NT':
        var array = req.body.scriptContent
          .replace(/^\n*/, '')
          .replace(/\n{2,}/g, '\n')
          .replace(/\n*$/, '')
          .split('\n')
        var flag = array.some(item => {
          return item.startsWith('cd')
        })
        if (flag) {
          for (var i = 0; i < array.length; i++) {
            console.log(array[i])
            let item = array[i]
            if (item.startsWith('cd')) {
              let child = item.substring(2)
              try {
                shell.cd(child, {
                  encoding: 'base64'
                }, function (
                  code,
                  stdout,
                  stderr
                ) {
                  console.log(
                    iconv.decode(iconv.encode(code, 'base64'), 'gb2312')
                  )
                  console.log(
                    iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312')
                  )
                  console.log(
                    iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312')
                  )
                })
              } catch (error) {
                console.log(error)
              }
            } else {
              try {
                await shellAction(item)
              } catch (error) {
                console.log(error)
              }
            }
          }
        } else {
          shellAction(req.body.scriptContent)
        }
        break
      default:
        var resultMes = '不支持此系统'
        res.send({
          ...resultErr,
          resultMes
        })
        break
    }
  } catch (error) {
    res.send(resultErr)
  }
}

function shellAction(sh) {
  return new Promise(function (resolve, reject) {
    shell.exec(sh, {
      encoding: 'base64'
    }, function (code, stdout, stderr) {
      if (stdout) {
        resolve()
      } else if (stderr) {
        reject()
      } else {
        resolve()
      }
      console.log(code)
      console.log(iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312'))
      console.log(iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312'))
    })
  })
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function deleteScript(req, res) {
  try {
    await commonServer.deleteByID(req.body.scriptId, 'scriptId', 'script')
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function deleteProject(req, res) {
  try {
    await commonServer.deleteByID(req.body.projectId, 'projectId', 'project')
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function updateScript(req, res) {
  try {
    await workServer.updateScript(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function updateTemp(req, res) {
  try {
    await workServer.updateTemp(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function changeTodoList(req, res) {
  try {
    await workServer.changeTodoList(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}

async function projectAction(req, res) {
  try {
    res.send(result)
    let script = await workServer.queryScriptById(req.body.action)
    let scriptContent = script[0].scriptContent
    console.log(req.body.pathUrl)
    let str = scriptContent.replace(/\{\{filePath\}\}/g, req.body.pathUrl)
    str = str.replace(/\{\{branchNum\}\}/g, req.body.param)
    let type = os.type()
    switch (type) {
      case 'Darwin':
      case 'Linux':
        shell.exec(str)
        break
      case 'Windows_NT':
        var array = str
          .replace(/^\n*/, '')
          .replace(/\n{2,}/g, '\n')
          .replace(/\n*$/, '')
          .split('\n')
        var flag = array.some(item => {
          return item.startsWith('cd')
        })
        if (flag) {
          for (var i = 0; i < array.length; i++) {
            console.log(array[i])
            let item = array[i]
            if (item.startsWith('cd')) {
              let child = item.substring(2)
              try {
                shell.cd(child, {
                  encoding: 'base64'
                }, function (
                  code,
                  stdout,
                  stderr
                ) {
                  console.log(
                    iconv.decode(iconv.encode(code, 'base64'), 'gb2312')
                  )
                  console.log(
                    iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312')
                  )
                  console.log(
                    iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312')
                  )
                })
              } catch (error) {
                console.log(error)
              }
            } else {
              try {
                await shellAction(item)
              } catch (error) {
                console.log(error)
              }
            }
          }
        } else {
          shellAction(str)
        }
        break
      default:
        var resultMes = '不支持此系统'
        res.send({
          ...resultErr,
          resultMes
        })
        break
    }
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/initNewProject 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function deleteTemp(req, res) {
  try {
    await commonServer.deleteByID(req.body.templateId, 'templateId', 'template')
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
async function updateProject(req, res) {
  try {
    await workServer.updateProject(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
async function updateComp(req, res) {
  try {
    await workServer.updateComp(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
async function deleteComponent(req, res) {
  try {
    await commonServer.deleteByID(req.body.templateId, 'componentId', 'component')
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}

function getPList(obj) {
  var list = []
  for (let k = 7; k != 0; k--) {
    let key = 'day' + k
    list.push(obj[key])
  }
  return list
}
async function queryIndexTrend(req, res) {
  try {
    let component = await commonServer.queryIndexTrend('component')
    let project = await commonServer.queryIndexTrend('project')
    let template = await commonServer.queryIndexTrend('template')
    let script = await commonServer.queryIndexTrend('script')
    let date = []
    for (var i = -6; i <= 0; i++) {
      let dd = new Date();
      dd.setDate(dd.getDate() + i)
      date.push(sd.format(dd, 'YYYY/MM/DD'))
    }
    let list = [{
      name: '项目',
      list: getPList(project[0])
    }, {
      name: '模板',
      list: getPList(template[0])
    }, {
      name: '组件',
      list: getPList(component[0])
    }, {
      name: '脚本',
      list: getPList(script[0])
    }]
    let resultEntity = {
      date: date,
      list: list
    }
    res.send({
      ...result,
      resultEntity
    })
  } catch (error) {
    res.send(resultErr)
  }
}

module.exports = {
  getIndexCount,
  getProjectType,
  initNewProject,
  getProjectList,
  getProjectSum,
  newTemplate,
  queryTemplateList,
  queryTemplateSum,
  queryComponentList,
  queryComponentSum,
  insertComponent,
  queryUser,
  queryTodoList,
  insertTodoList,
  queryScriptList,
  insertScript,
  actionScript,
  deleteScript,
  updateScript,
  deleteTemp,
  updateTemp,
  deleteProject,
  updateProject,
  updateComp,
  deleteComponent,
  queryIndexTrend,
  changeTodoList,
  getPersonActive,
  projectAction
}