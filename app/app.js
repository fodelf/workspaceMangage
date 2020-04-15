#!/usr/bin/env node
/*
 * @Description: 项目入口
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:34:42
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-15 20:02:53
 */
const express = require('express')
const open = require('open')
const bodyParser = require('body-parser')
const { initTable } = require('./sql/initTable')
const config = require('./config/config')
const workServer = require('./service/work.js')
const common = require('./service/common.js')
const socket = require('./service/socket.js')
const routerAction = require('./router/router.js')
const portfinder = require('portfinder')
const http = require('http')
const path = require('path')
const mutipart = require('connect-multiparty')
const mutipartMiddeware = mutipart()
const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
})
initTable()
const app = express()
app.use(
  log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
  })
)
// app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// 解决跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ', err)
  console.log('Stack:', err.stack)
})
app.use(express.static(path.join(__dirname, 'static')))
// app.use('/easyWork', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
routerAction(app)
// 根据id获取项目明细
app.get('/api/queryProjectById', workServer.queryProjectById)
// 判断路径是否存在
app.post('/api/isFileExist', common.isFileExist)
// 上传文件
app.post('/api/upload', mutipartMiddeware, common.upload)
portfinder.getPort(
  {
    port: 8081, // minimum port
    stopPort: 9000 // maximum port
  },
  function(err, port) {
    if (err) {
      console.log(err)
    }
    var url = `http://${config.ip}:${port}`
    config.url = url
    var server = http.createServer(app).listen(port, '0.0.0.0', () => {
      console.log(`app start at ${url}`)
      // open(url)
    })
    const io = require('socket.io')(server)
    io.on('connection', client => {
      client.on('event', data => {
        console.log(data)
      })
      client.on('in', async data => {
        console.log(data)
      })
      client.on('project', data => {
        socket.projectHandle(data, client)
      })
    })
  }
)
