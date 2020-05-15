/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:14:02
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-15 08:28:27
 */
function getIPAddress() {
  const os = require('os');
    const interfaces = os.networkInterfaces();
    let localIp = '';
    for (let dev in interfaces) {
        if (dev === '本地连接' || dev === '以太网') {
            for (let j = 0; j < interfaces[dev].length; j++) {
                if (interfaces[dev][j].family === 'IPv4') {
                  localIp = interfaces[dev][j].address;
                  break;
                }
            }
        }
    }
    return localIp
  // var os = require('os');
  // var interfaces = os.networkInterfaces();
  // var IPv4 = '127.0.0.1';
  // for (var key in interfaces) {
  //   interfaces[key].forEach(function(details){
  //     if (details.family == 'IPv4' && key == 'en0'  ) {
  //         IPv4 = details.address;
  //     }
  //   });
  // }
  // return IPv4;
  // var interfaces = require('os').networkInterfaces()
  // for (var devName in interfaces) {
  //   var iface = interfaces[devName]
  //   for (var i = 0; i < iface.length; i++) {
  //     var alias = iface[i]
  //     if (
  //       alias.family === 'IPv4' &&
  //       alias.address !== '127.0.0.1' &&
  //       !alias.internal
  //     ) {
  //       return alias.address
  //     }
  //   }
  // }
}
module.exports = {
  getIPAddress
}
