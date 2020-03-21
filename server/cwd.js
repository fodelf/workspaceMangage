/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-14 19:07:52
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-11-14 19:08:20
 */
const channels = require('./channels')
const fs = require('fs')
const path = require('path')

let cwd = process.cwd()

function normalize(value) {
  if (value.length === 1) return value
  const lastChar = value.charAt(value.length - 1)
  if (lastChar === path.sep) {
    value = value.substr(0, value.length - 1)
  }
  return value
}

module.exports = {
  get: () => cwd,
  set: (value, context) => {
    value = normalize(value)
    if (!fs.existsSync(value)) return
    cwd = value
    process.env.VUE_CLI_CONTEXT = value
    context.pubsub.publish(channels.CWD_CHANGED, { cwdChanged: value })
    try {
      process.chdir(value)
    } catch (err) {}
  }
}
