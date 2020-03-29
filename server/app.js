/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:34:42
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-29 22:46:19
 */
const express = require('express')
const bodyParser = require('body-parser')
const { initTable } = require('./sql/initTable')
const { getIPAddress } = require('./utils/ipAddress')
const workServer = require('./server/workServer.js')
const portfinder = require('portfinder')
const http = require('http')
// const execa = require("execa");
const {
  execa
} = require('@vue/cli-shared-utils')
// const io = require("log.io")
// const NodeMonkey = require('node-monkey')
// 初始化数据库
initTable()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 解决跨域
app.all('*', function (req, res, next) {
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
// app.post('/api/newProject', workServer.newProject)
// 获取项目列表
app.get('/api/getProjectList', workServer.getProjectList)
// 获取项目汇总列表
app.get('/api/getProjectSum', workServer.getProjectSum)
// 上传文件
app.post('/api/upload', workServer.upload)
// 新增模板
app.post('/api/template/newTemplate', workServer.newTemplate)
// 模板列表查询
app.get('/api/template/queryTemplateList', workServer.queryTemplateList)
portfinder.getPort(
  {
    port: 8080, // minimum port
    stopPort: 9000 // maximum port
  },
  function (err, port) {
    if (err) { console.log(err) }
    var server = http.createServer(app).listen(8081, '0.0.0.0', () => {
      console.log(`app start at http://${getIPAddress()}:${8081}`)
    });
    const io = require('socket.io')(server);
    io.on('connection', client => {
      client.on('event', (data) => {
        console.log(data)
      });
      client.on('in', async (data) => {
        const exec = require('child_process').exec
        const ls = exec(`cd  /Users/fodelf/git/gitActions
                        npm run serve
                        `, {})
        // const spawn = require('child_process').spawn;
        // const ls = spawn(`cd  /Users/fodelf/git/gitActions
        // npm i
        // `, ['-lh', '/usr']);
        ls.stdout.on('data', (data) => {
          client.emit('mes',data);
        });
        ls.stderr.on('data', (data) => {
          client.emit('mes',data);
        });
        ls.on('close', (code) => {
          // client.emit('mes',code);
        });
        // console.log(data.Data)
        // const child =  execa('cd', ['/Users/fodelf/git/gitActions'],  {
        //   cwd: process.cwd(),
        //   stdio: ['inherit', 'pipe', 'inherit']
        // })
        // child.stdout.on('data', (buffer)=>{
        //   // console.log(buffer.toString().trim())
        //   client.emit('mes',buffer.toString().trim());
        // })
        // await child
        // const child1 =  execa('npm', ['i'],  {
        //   cwd: process.cwd(),
        //   stdio: ['inherit', 'pipe', 'inherit']
        // })
        // child1.stdout.on('data', (buffer)=>{
        //   // console.log(buffer.toString().trim())
        //   client.emit('mes',buffer.toString().trim());
        // })

        // var process = require('child_process');

        // // var cmd = 'data';
        // process.exec(`cd /Users/fodelf/git/gitActions
        // npm i
        // `, function(error, stdout, stderr) {
        //     if(error){
        //       client.emit('mes',error);
        //     }
        //     if(stdout){
        //       client.emit('mes',stdout);
        //     }
        //     if(stderr){
        //       client.emit('mes',stderr);
        //     }
        // });
        // execa(data.Data).then(result => {
        //   console.log(result)
        //   console.log("ls")
        //   client.emit('mes',result.stdout);
        // }).catch(e=>{
        //   client.emit('mes','当前系统不支持此命令');
        // });

        // const child =  execa('ls', [],  {
        //   cwd: process.cwd(),
        //   stdio: ['inherit', 'pipe', 'inherit']
        // })
        // child.stdout.on('data', (buffer)=>{
        //   console.log(buffer.toString().trim())
        // })
        //   console.log('data')
        //   let  i = 1
        //   setInterval(()=>{
        //     client.emit('mes',i++);
        //   },5000)
      });

    });
  }
)