/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-28 12:40:28
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-01 22:41:37
 */
let download = require('download-git-repo')
const {nodeModules} = require('./app/utils/gitDown.js');
// let {relativeDir} = require('./server/utils/computed.js')
let path = require('path')
// const tmpdir = path.join(__dirname)
const presetName = 'https://github.com/fodelf/gitActions.git'
console.log(__dirname)
console.log(path.relative(__dirname,'/Users/fodelf/git/testb/s'))
// console.log(relativeDir('/Users/fodelf/git/testb/s',__dirname))
function xx(){
    download(`direct:${presetName}`, path.relative(__dirname,'/Users/fodelf/git/testb/s'), { clone: true }, function (err) {
        if(err){
            xx() 
        }else{
            console.log()
        }
      })
}
xx()

// var spawn = require('child_process').spawn;

// function test (repo, targetPath, opts, cb) {

//     if (typeof opts === 'function') {
//         cb = opts;
//         opts = null;
//     }

//     opts = opts || {};

//     var git = opts.git || 'git';
//     var args = ['clone'];

//     if (opts.shallow) {
//         args.push('--depth');
//         args.push('1');
//     }

//     args.push('--');
//     args.push(repo);
//     args.push(targetPath);

//     var process = spawn(git, args);
//     process.on('close', function(status) {
//         if (status == 0) {
//             if (opts.checkout) {
//                 _checkout();
//             } else {
//                 cb && cb();    
//             }
//         } else {
//             cb && cb(new Error("'git clone' failed with status " + status));
//         }
//     });

//     function _checkout() {
//         var args = ['checkout', opts.checkout];
//         var process = spawn(git, args, { cwd: targetPath });
//         process.on('close', function(status) {
//             if (status == 0) {
//                 cb && cb();
//             } else {
//                 cb && cb(new Error("'git checkout' failed with status " + status));
//             }
//         });
//     }

// }
// echo "src/components/*" >> .git/info/sparse-checkout


const gitdownFunc = nodeModules();
const url = require('url')
// git remote add origin https://github.com/swoole/swoole-src.git
// const repoOption = {
//     owner: '', // git 仓库作者名
//     repoName: '',// git 仓库名称
//     ref: '',// git 仓库指定 branch，commit 或 tag，
//     relativePath: '', // 指定git所需要下载的目录或者文件相对位置
//     username: '',// 指定git用户名, 在下载私有仓库时需要的配置参数.
//     password: '', // 指定git密码, 同username 一起使用，在下载私有仓库时需要的配置参数.
//     token: '' // git token 是另一种登录方式的可配置参数，用于下载私有仓库.
// }

// const githubLinkOption = {
//     githubLink: 'https://github.com/fodelf/gitActions/tree/master/src/components', // 也可以直接指定github 需要下载路径的地址
// }

// const destPath = path.resolve(__dirname, './aaa'); // 目标下载路径

// const dgitOptions = {
//     maxRetryCount: 3, // 网络问题下载失败时尝试最大重新下载次数
//     parallelLimit: 10, // 并行下载个数
//     log: true, // 是否开启内部日志
//     logSuffix: '', // 日志前缀
//     exclude: [], // 需要排除的文件路径,
//     include: [], // 需要包含的文件路径
// }

// const hooks = {
//     onSuccess: () => {},
//     onError: (err) => err,
//     onProgress: (status, node) => {},
//     onResolved: (status) => {},
// }


// var func = async () => {
//     await dgit(
//         repoOption,
//         destPath,
//         dgitOptions,
//         hooks,
//     );
//     console.log('repoOption download succeed.');

//     await dgit(
//         githubLinkOption,
//         destPath,
//         dgitOptions,
//         hooks,
//     );
//     console.log('githubLinkOption download succeed.');
// }
// func()




// const s = 'https://github.com/fodelf/gitActions/tree/master/src/components'
// download(`direct:${s}`, 'test/s', { clone: true }, function (err) {
//   console.log(err ? 'Error' : 'Success')
// })

// presetName.replace(".git", '')
// console.log(presetName)
// let filePath = __dirname
// let workerProcess = exec(`cd  ${filePath}
//   `, {})
// workerProcess.on('close', function (code) {
//   download(`direct:${presetName}`, 'test/tmp', { clone: true }, function (err) {
//     console.log(err ? 'Error' : 'Success')
//   })
//   // const gitdownFunc = nodeModules();
//   // gitdownFunc(['https://github.com/fodelf/workspaceMangage'], callBackFun);
// })

// download('https://github.com/fodelf/gitActions.git', 'test/tmp', { clone: true }, function (err) {
//   console.log(err ? 'Error' : 'Success')
// })
// download('fodelf/gitActions', 'test/tmp', { clone: true }, function (err) {
//   console.log(err ? 'Error' : 'Success')
// })
// download('fodelf/gitActions', 'test/tmp', function (err) {
//   console.log(err ? 'Error' : 'Success')
// })
// download('direct:https://github.com/FormidableLabs/urql',{ clone: true }, function (err) {
//   console.log(err ? 'Error' : 'Success')
// })
// let os = require('os')
// console.log(path.join(os.tmpdir(), presetName))