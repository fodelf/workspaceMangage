/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-01 13:47:06
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-04 09:03:03
 */
const fs = require('fs');
const url = require('url');
const fsExtra = require('fs-extra');
const path = require('path');
const request = require('request');
async function projectHandle(data, client) {
  console.log(data);
  console.log(path.join('/Users/fodelf/git', data.projectName));
  let projectPath = path.join('/Users/fodelf/git');
  console.log(data.templateUrl);
  console.log(projectPath);
  const { spawn } = require('child_process');
  await fsExtra.remove(path.join('/Users/fodelf/git', data.projectName));
  function mkdirsSync(dirname, mode) {
    console.log(dirname);
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname), mode)) {
        fs.mkdirSync(dirname, mode);
        return true;
      }
    }
  }
  mkdirsSync(projectPath);
  client.emit('mes', '开始下载请稍后');
  const ls = spawn('git', ['clone', data.templateUrl, data.projectName], {
    cwd: projectPath
  });
  ls.stderr.on('data', data => {
    console.log(1);
    console.log(data);
    client.emit('mes', data.toString().trim());
  });
  ls.on('close', code => {
    if (code == 0) {
      client.emit('mes', '开始初始化包');
      const childLs = spawn('npm', ['i'], {
        cwd: path.join(projectPath, data.projectName)
      });
      childLs.stderr.on('data', data => {
        console.log(2);
        console.log(data);
        client.emit('mes', data.toString().trim());
        console.log(`stderr: ${data}`);
      });
      childLs.on('close', data => {
        if (data == 0) {
          client.emit('mes', '初始化成功');
        } else {
          client.emit('mes', '初始化失败');
        }
      });
    } else {
      client.emit('mes', `子进程退出，退出码 ${code}`);
    }
  });
}
// 组件初始化
async function templateHandle(data, client) {
  const testUrl =
    'https://github.com/fodelf/workspaceMangage/tree/master/src/assets/common/css';
  // const testUrl ='http://gitlab.yzf.net/daizhang/daizhang.static/tree/master/checkout/js'
  const pathObj = url.parse(testUrl);
  const myURL = new URL(testUrl);
  // console.log(myURL.pathname);
  var repoPath = myURL.pathname;
  var splitPath = repoPath.split('/');
  var info = {};
  info.author = splitPath[1];
  info.repository = splitPath[2];
  info.branch = splitPath[4];
  info.rootName = splitPath[splitPath.length - 1];
  if (splitPath[4]) {
    info.resPath = repoPath.substring(
      repoPath.indexOf(splitPath[4]) + splitPath[4].length + 1
    );
  }
  info.urlPrefix =
    `${pathObj.protocol}//api.${pathObj.host}/repos/` +
    info.author +
    '/' +
    info.repository +
    '/contents/';
  info.urlPostfix = '?ref=' + info.branch;
  info.downloadFileName = info.rootName;
  var dirPaths = [];
  var files = [];
  var requestedPromises = [];

  dirPaths.push(info.resPath);
  let repoInfo  = info
  console.log(repoInfo.urlPrefix+repoInfo.resPath+repoInfo.urlPostfix)
  request({
    timeout:5000,    // 设置超时
    method:'GET',    //请求方式
    headers:{
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    },
    url:repoInfo.urlPrefix+repoInfo.resPath+repoInfo.urlPostfix
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            
        }else{
            console.log("error");
        }
    });

  // mapFileAndDirectory(dirPaths, files, requestedPromises, progress);
}
templateHandle()
async function xx(){
  const execSync = require('child_process').execSync
   const fs = require('fs')
  const cmd1 = 'git init'
  let c = 'git remote remove origin'
  let cmd2 = 'git remote add -f origin '
  const cmd3 = 'git config core.sparsecheckout true'
  const cmd4 = 'git pull origin master'
  cmd2 += 'http://gitlab.yzf.net/daizhang/daizhang.static'
  // let path = 'checkout/js'
 var  process = require('child_process')
         process.exec(`cd ${path.join(__dirname,'cc')}
         ${c}
         ${cmd1}
         ${cmd2}
         ${cmd3}
        `, function(error, stdout, stderr) {
            if(error){
              console.log(error);
            }
            if(stdout){
              console.log(stdout);
            }
            if(stderr){
              console.log(stderr);
            }
        });
    fs.writeFileSync(path.join(__dirname,'cc','.git/info/sparse-checkout'), 'checkout')
    console.log('ccc')
    let s = process.exec(`cd ${path.join(__dirname,'cc')}
    ${cmd4}
    `)
     s.on('close',function(code){
    if(code ==0){
      console.log('chenggg')
    }else{
      console.log(code)
    }
  })
  // var p = execSync(cmd1,{cwd:'./cc'})
  // p.on('close',function(code){
  //   if(code ==0){
  //     console.log('chenggg')
  //   }else{
  //     console.log(code)
  //   }
  // })
  // execSync(cmd2,{cwd:'./cc'})
  // execSync(cmd3,{cwd:'./cc'})
  // fs.writeFileSync('./cc/.git/info/sparse-checkout', path)
  // p = execSync(cmd4)
  // p.on('close',function(code){
  //   if(code ==0){
  //     console.log('chenggg')
  //   }else{
  //     console.log(code)
  //   }
  // })
}
// xx()
module.exports = {
  projectHandle,
  templateHandle
};
