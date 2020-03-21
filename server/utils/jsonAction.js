/*
 * @Description: json读写的工具类
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-17 12:39:51
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-17 20:32:36
 */
const path = require('path')
const fs = require('fs')
const localsPath = {
  project: path.join(__dirname, 'locals', 'project.json'),
  template: path.join(__dirname, 'locals', 'template.json'),
  component: path.join(__dirname, 'locals', 'component.json')
}
const project = {
  name: '',
  filePath: '',
  decPath: ''
}
const template = {
  name: '',
  gitPath: '',
  decPath: ''
}
const addAction = {
  project: function(data) {
    fs.writeFile(localsPath['project'], data, function(err) {
      if (err) {
        throw err
      } else {
        console.log('ss')
      }
    })
  }
}
const handelActions = {
  query: function(type) {
    fs.readFile(localsPath[type], 'utf8', function(err, data) {
      if (err) {
        throw err
      } else {
        console.log(data)
      }
    })
  },
  add: function(type, data) {
    addAction[type](data)
  },
  delete: function(type, data) {
    fs.writeFile(localsPath[type], data, function(err) {
      if (err) {
        throw err
      } else {
        console.log('ss')
      }
    })
  }
}
module.exports = {
  handelActions
}
