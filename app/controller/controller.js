/*
 * @Description: 控制器
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:43:57
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-14 13:46:33
 */
const url = require('url')
const sh = require('shelljs')
const os = require('os')
const iconv = require('iconv-lite')
const workServer = require('../service/work.js')
const commonServer = require('../service/common.js')
const { formatTime } = require('../utils/formatTime.js')
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
    res.send({ ...result, resultEntity })
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
    res.send({ ...result, resultEntity })
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
    res.send({ ...result, resultEntity })
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
    res.send({ ...result, resultEntity })
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
    await workServer.initNewProject(req.body)
    res.send(result)
  } catch (error) {
    res.send(resultErr)
  }
}
/**
 * @api {post} /api/getProjectList 新增项目
 * @apiGroup project
 * @apiSuccess {Number} projectCount 项目数量汇总.
 * @apiSuccess {Number} templateCount 模板数量数量汇总.
 */
async function getProjectList(req, res) {
  _getList(req, res, 'project')
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
  _getList(req, res, 'template')
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
    res.send({ ...result, resultEntity })
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
    return item
  })
  let resultEntity = list
  res.send({ ...result, resultEntity })
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
    res.send({ ...result, resultEntity })
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
  res.send(result)
  try {
    let type = os.type()
    switch (type) {
      case 'Darwin':
      case 'Linux':
        sh.exec(req.body.scriptContent)
        break
      case 'Windows_NT':
        console.log(req.body.scriptContent)
        var array = req.body.scriptContent
          .replace(/^\n*/, '')
          .replace(/\n{2,}/g, '\n')
          .replace(/\n*$/, '')
          .split('\n')
        var flag = array.some(item => {
          return item.startsWith('cd')
        })
        console.log(array)
        if (flag) {
          array.forEach(async item => {
            if (item.startsWith('cd')) {
              let child = item.substring(2)
              console.log(child)
              await shellAction(child, 'cd')
              // sh.cd(child, { encoding: 'base64' }, function(
              //   code,
              //   stdout,
              //   stderr
              // ) {
              //   console.log(
              //     iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312')
              //   )
              //   console.log(
              //     iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312')
              //   )
              // })
            } else {
              await shellAction(item, 'sh')
              // sh.exec(item, { encoding: 'base64' }, function(
              //   code,
              //   stdout,
              //   stderr
              // ) {
              //   console.log(code)
              //   console.log(
              //     iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312')
              //   )
              //   console.log(
              //     iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312')
              //   )
              // })
            }
          })
        } else {
          sh.exec(req.body.scriptContent)
        }
        break
      default:
        var resultMes = '不支持此系统'
        res.send({ ...resultErr, resultMes })
        break
    }
  } catch (error) {
    res.send(resultErr)
  }
}
function shellAction(sh, type) {
  return new Promise(function(resolve, reject) {
    switch (type) {
      case 'cd':
        sh.cd(sh, { encoding: 'base64' }, function(code, stdout, stderr) {
          if (stdout) {
            resolve()
          } else if (stderr) {
            reject()
          } else {
            resolve()
          }
          console.log(iconv.decode(iconv.encode(stdout, 'base64'), 'gb2312'))
          console.log(iconv.decode(iconv.encode(stderr, 'base64'), 'gb2312'))
        })
        break
      default:
        sh.exec(sh, { encoding: 'base64' }, function(code, stdout, stderr) {
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
        break
    }
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
async function updateScript(req, res) {
  try {
    await workServer.updateScript(req.body)
    res.send(result)
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
  updateScript
}
