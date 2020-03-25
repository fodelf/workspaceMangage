/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:34:42
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-22 19:36:42
 */
const express = require('express')
const bodyParser = require('body-parser')
const { initTable, sqliteDB } = require('./sql/initTable')
const { getIPAddress } = require('./utils/ipAddress')
const  workServer = require('./server/workServer.js')
const portfinder = require('portfinder')
const http = require('http')
const fs = require('fs')
// const io = require("log.io")
// const NodeMonkey = require('node-monkey')
// 初始化数据库
initTable()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 解决跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// 首页列表计数详细
app.get('/api/getIndexCount', workServer.getIndexCount)
// 获取项目类型
app.get('/api/getProjectType', workServer.getProjectType)
// 新建项目
app.post('/api/initNewProject', workServer.initNewProject)
// 新建项目
app.post('/api/newProject', workServer.newProject)
// 获取项目列表
app.get('/api/getProjectList', workServer.getProjectList)
// 获取项目汇总列表
app.get('/api/getProjectSum', workServer.getProjectSum)
// 获取项目汇总列表
app.get('/api/getProjectSum', workServer.getProjectSum)
portfinder.getPort(
  {
    port: 8080, // minimum port
    stopPort: 9000 // maximum port
  },
  function(err, port) {
    if (err) {
    }
    http.createServer(app).listen(8081,'0.0.0.0',()=>{
      console.log(`app start at http://${getIPAddress()}:${port}`)
    });
  }
)
const readline = require('readline');  
const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout  
});  
  
// var inputArr = [];  
// rl.on('line', function (input) {  
//     inputArr.push(input);// 获取此行数据  
//     var nLine = parseInt(inputArr[0]);// 获取行数  
//     if(inputArr.length==(nLine + 1)){ // 获取了此轮所有数据，此时获取元素 nLine+1 个，第一个元素为行数nLine.  
//         var arr = inputArr.slice(1);// 除去行数的具体数据  
//         // 下面就可以对数据进行处理......  
//         console.log('arr');
//         console.log(arr);  
//         inputArr = [];// 清空数组  
//     }  
// })
// NodeMonkey(5000)
// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// // 自定义的简单记录器。
// const logger = new Console({ stdout: output, stderr: errorOutput });