/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 21:34:42
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 17:02:26
 */
const express = require('express')
const bodyParser = require('body-parser')
const { initTable } = require('./sql/initTable')
const config = require('./config/config')
const workServer = require('./service/work.js')
const common = require('./service/common.js')
const socket = require('./service/socket.js')
const routerAction = require('./router/router.js')
const portfinder = require('portfinder')
const http = require('http')
const mutipart = require('connect-multiparty')
const mutipartMiddeware = mutipart()
const path = require('path')
initTable()
const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// 解决跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.use(express.static(path.join(process.cwd(), 'static')))
routerAction(app)
// 首页列表计数详细
/**
 * @api {get} /api/getIndexCount
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// app.get('/api/getIndexCount', workServer.getIndexCount)
// 获取项目类型
app.get('/api/getProjectType', workServer.getProjectType)
// 新建项目
app.post('/api/initNewProject', workServer.initNewProject)
// 获取项目列表
app.get('/api/getProjectList', workServer.getProjectList)
// 获取项目汇总列表
app.get('/api/getProjectSum', workServer.getProjectSum)
// 根据id获取项目明细
app.get('/api/queryProjectById', workServer.queryProjectById)
// 新增模板
app.post('/api/template/newTemplate', workServer.newTemplate)
// 模板列表查询
app.get('/api/template/queryTemplateList', workServer.queryTemplateList)
// 模板汇总查询
app.get('/api/template/queryTemplateSum', workServer.queryTemplateSum)
// 模板组件列表查询
app.get('/api/component/queryComponentList', workServer.queryComponentList)
// 模板组件汇总查询
app.get('/api/component/queryComponentSum', workServer.queryComponentSum)
// 新增组件
app.post('/api/component/insertComponent', workServer.insertComponent)
// 判断路径是否存在
app.post('/api/isFileExist', common.isFileExist)
// 获取用户
app.get('/api/getUser', common.getUser)
// 上传文件
app.post('/api/upload', mutipartMiddeware, common.upload)
portfinder.getPort(
  {
    port: 8080, // minimum port
    stopPort: 9000 // maximum port
  },
  function(err, port) {
    if (err) {
      console.log(err)
    }
    config.port = port
    var server = http.createServer(app).listen(8081, '0.0.0.0', () => {
      console.log(`app start at http://${config.ip}:${8081}`)
    })
    const io = require('socket.io')(server)
    io.on('connection', client => {
      client.on('event', data => {
        console.log(data)
      })
      client.on('in', async data => {
        const exec = require('child_process').exec
        const ls = exec(
          `cd  /Users/fodelf/git/gitActions
                        npm run serve
                        `,
          {}
        )
        // const spawn = require('child_process').spawn;
        // const ls = spawn(`cd  /Users/fodelf/git/gitActions
        // npm i
        // `, ['-lh', '/usr']);
        ls.stdout.on('data', data => {
          client.emit('mes', data)
        })
        ls.stderr.on('data', data => {
          client.emit('mes', data)
        })
        ls.on('close', code => {
          // client.emit('mes',code);
        })
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
      })
      client.on('project', data => {
        socket.projectHandle(data, client)
      })
    })
  }
)
