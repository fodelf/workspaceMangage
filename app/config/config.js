/*
 * @Description: 配置
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 09:25:46
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 09:29:54
 */
const { getIPAddress } = require('../utils/ipAddress')
const ip = getIPAddress()
const port = ''
module.exports = {
  ip,
  port
}
