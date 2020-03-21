/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-18 08:40:40
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-17 23:05:18
 */
const bodyParser = require('body-parser')
const folders = require('./folders')
const fs = require('fs-extra')
const f = require('fs')
const mutipart = require('connect-multiparty')
const mutipartMiddeware = mutipart()
// const proxy = require('http-proxy-middleware')
const _ = require('lodash')
const path = require('path')
const prettierTslint = require('prettier-tslint')
const isPlatformWindows = process.platform.indexOf('win') === 0
function resolve(dir) {
  return path.join(__dirname, dir)
}
/**
 * @name: getCatalogue
 * @description: 获取当前目录
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 */
function getCatalogue(app) {
  app.post('/api/getCatalogue', (req, res) => {
    let currget = folders.getCurrent()
    res.json({ data: currget })
  })
}
/**
 * @name: getTemplate
 * @description: 获取当前目录
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 */
function getTemplate(app) {
  app.post('/api/getTemplate', (req, res) => {
    let path = resolve('template')
    folders
      .fileList(path)
      .then(data => {
        res.json({ data: data })
      })
      .catch(() => {
        res.json({ data: [] })
      })
  })
}
/**
 * @name: download
 * @description: 下载
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 */
function download(app) {
  app.post('/api/downLoad', function(req, res) {
    let path = req.body.path
    let name = path.split('\\').pop()
    console.log(name)
    // res.download(path)
    let size = fs.statSync(path).size
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      // 'Access-Control-Expose-Headers':'Content-Disposition',
      'Content-Disposition': 'attachment; filename=' + encodeURI(name),
      'Content-Length': size
    })
    let readStream = f.createReadStream(path) // 得到文件输入流
    readStream.on('data', chunk => {
      res.write(chunk, 'binary') // 文档内容以二进制的格式写到response的输出流
    })
    readStream.on('end', () => {
      res.end()
    })
  })
}
/**
 * @name: getList
 * @description: 获取文件列表
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 */
function getList(app) {
  app.post('/api/getCatalogueList', (req, res) => {
    let base = req.body.path
    folders
      .list(base)
      .then(data => {
        res.json({ data: data })
      })
      .catch(() => {
        res.json({ data: [] })
      })
  })
}

/**
 * @name: upload
 * @description: 上传文件模板
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 */
function upload(app) {
  app.post('/api/upload', mutipartMiddeware, function(req, res) {
    const file = req.files.file
    fs.readFile(file.path, 'utf8', function(err, data) {
      console.log(err)
      let outPath =
        folders.getCurrent().path + '/server/template/' + file.originalFilename
      fs.outputFile(outPath, data, function() {
        res.json({ data: '' })
      })
    })
  })
}

function generateTs(app) {
  app.post('/api/generateTs', function(req, res) {
    let swagger = req.body.swagger
    let tempUrl = req.body.templateUrl
    let name = tempUrl.split('\\').pop()
    let outPath = isPlatformWindows
      ? req.body.path + '\\' + name
      : req.body.path + '/' + name
    // 读取模板文件，并修改内容
    let templateString = fs.readFileSync(tempUrl, 'utf8')
    let swaggerList = []
    let includesAny = ['file']
    for (let k of swagger) {
      let arry = k.data.parameters
      if (Array.isArray(arry)) {
        let child = {}
        arry.map(item => {
          if (item.type === 'integer') {
            item.type = 'number'
          } else if (item.type === 'array') {
            // item.type = 'Array&lt;any&gt;'
            item.type = 'any'
          } else if (includesAny.includes(item.type) || !item.type) {
            item.type = 'any'
          }
          return item
        })
        child['parameters'] = arry
        child['ClassName'] = k.data.operationId.replace(
          k.data.operationId[0],
          k.data.operationId[0].toUpperCase()
        )
        child['desc'] = k.data.summary
        swaggerList.push(child)
      }
    }
    var compiled = _.template(templateString)
    let content = compiled({
      attrs: swaggerList
    })
    fs.outputFile(outPath, content, function() {
      if (outPath.includes('ts')) {
        prettierTslint.fix(outPath)
      }
      let templateString1 = fs.readFileSync(outPath, 'utf8')
      res.json({ data: templateString1 })
    })
  })
}

function API(app) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json({ limit: '5000000kb' }))
  getCatalogue(app)
  getList(app)
  upload(app)
  generateTs(app)
  getTemplate(app)
  download(app)
  // var options = {
  //   target: ''
  // }
  // var exampleProxy = proxy(options)
  // app.use('', exampleProxy)
}

module.exports = API
