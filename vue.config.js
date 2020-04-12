/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-19 08:46:03
 * @LastEditors: pym
 * @LastEditTime: 2020-04-12 21:29:23
 */
const path = require('path')
const ispro = process.env.NODE_ENV !== 'development'
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: ispro ? '' : '/',
  outputDir: 'app/public',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9528'
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('base', resolve('baseConfig'))
      .set('public', resolve('public'))
  }
}
