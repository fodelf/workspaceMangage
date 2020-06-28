/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-06-28 09:40:33
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-06-28 21:04:00
 */
const ChatBot = require('dingtalk-robot-sender');
// 组合 baseUrl 和 accessToken 如果采用加签方式的安全设置，同时填写secret
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: '147c9a08cdab0d449175898ded9134843d025810692b6dc19a30339f77d2d358',
  secret: 'SEC23e5c7252af5916198a2eb28a3233227be064bd64663f032152d90b090fd3cc6',
});

// 发送钉钉消息
let textContent = {
  "msgtype": "text",
  "text": {
    "content": "代账4.0项目，报错信息：xx is not defined ，报错明细 { source: 'webpack:///src/app.js', line: 18, column: 0, name: 'xx' }"
  },
  "at": {
    "atMobiles": [
      "18651892475",
      "189xxxx8325"
    ],
    "isAtAll": false
  }
}
robot.send(textContent).then(() => {
    // console.log(res)
});