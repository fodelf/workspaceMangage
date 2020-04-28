/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-19 07:14:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-22 23:08:51
 */
function getIPAddress() {
  var os = require('os');
    var interfaces = os.networkInterfaces();
    var IPv4 = '127.0.0.1';
    for (var key in interfaces) {
      interfaces[key].forEach(function(details){
        if (details.family == 'IPv4' && key == 'en0'  ) {
            IPv4 = details.address;
        }
      });
    }
    return IPv4;
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
