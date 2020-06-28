/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-06-28 19:24:21
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-06-28 21:10:03
 */
import ErrorStackParser from 'error-stack-parser'
window.addEventListener('unhandledrejection',e=>{
  throw e.reason
})
window.addEventListener('error',args=>{
  console.log(args)
  console.log(ErrorStackParser.parse(new Error(args.error.stack)));
})
var fs = require('fs'),
  path = require('path'),
  sourceMap = require('source-map')
// 要解析的map文件路径./test/vendor.8b1e40e47e1cc4a3533b.js.map
var GENERATED_FILE = path.join(
  process.cwd(),
  'test',
  'umi.js.map'
)
const exec = require('child_process').exec
console.log(GENERATED_FILE)
// 读取map文件，实际就是一个json文件
async function test(){
  var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString();
  // 通过sourceMap库转换为sourceMapConsumer对象
  var consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  // console.log(consumer)
  // 传入要查找的行列数，查找到压缩前的源文件及行列数
  var sm = consumer.originalPositionFor({
      line: 1,  // 压缩后的行数
      column: 145048  // 压缩后的列数
    });
    // consumer.originalPositionFor({ line: 2, column: 10 })
  console.log(sm)
  var workerProcess = exec('git blame -L 18,18  -e  app.js', {
    cwd: 'D:\\worksapce\\git\\yzf-cloudMarket\\yzf-cloudMarket-web\\src'
  })

  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })
  // 打印错误的后台可执行程序输出
  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data)
  })
  // 退出之后的输出
  workerProcess.on('close', function (code) {
    console.log('out code：' + code)
  })
  // // 压缩前的所有源文件列表
  // var sources = consumer.sources;
  // // 根据查到的source，到源文件列表中查找索引位置
  // var smIndex = sources.indexOf(sm.source);
  // // 到源码列表中查到源代码
  // var smContent = consumer.sourcesContent[smIndex];
  // // 将源代码串按"行结束标记"拆分为数组形式
  // const rawLines = smContent.split(/\r?\n/g);
  // // 输出源码行，因为数组索引从0开始，故行数需要-1
  // console.log(rawLines[sm.line - 1]);
}
test()