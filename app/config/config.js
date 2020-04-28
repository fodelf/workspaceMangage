/*
 * @Description: 配置
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 09:25:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-22 23:08:40
 */
const { getIPAddress } = require('../utils/ipAddress')
global.ip = getIPAddress()
global.url = ''
module.exports ={
    ip:global.ip
}