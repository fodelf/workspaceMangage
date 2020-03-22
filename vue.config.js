/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-19 08:46:03
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 20:03:37
 */
const API = require('./server/api')
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
          target: 'http://192.168.0.100:8081',
          // changeOrigin: false
      }
   }
  },
   
}