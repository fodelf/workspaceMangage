/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 21:06:27
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 13:50:19
 */
const sd = require('silly-datetime')
const initData = {
  projectType: [
    ['Javascript', 'Javascript'],
    ['Java', 'Java'],
    ['Go', 'Go'],
    ['Python', 'Python'],
    ['其他', 'other']
  ],
  script: [
    [
      '新建分支',
      `cd {{filePath}}\ngit checkout master\ngit pull\ngit checkout -b feature/zentao#{{branchNum}}\ngit push --set-upstream  origin  feature/zentao#{{branchNum}}`,
      'system',
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ],
    [
      '修复bug',
      `cd {{filePath}}\ngit checkout master\ngit pull\ngit checkout -b bugfix/zentao#{{branchNum}}\ngit push --set-upstream origin  bugfix/zentao#{{branchNum}}`,
      'system',
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ],
    [
      '检出开发分支',
      `cd {{filePath}}\ngit checkout master\ngit pull\ngit checkout -b feature/zentao#{{branchNum}}  origin/feature/zentao#{{branchNum}}`,
      'system',
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ],
    [
      '检出bug分支',
      `cd {{filePath}}\ngit checkout master\ngit pull\ngit checkout -b bugfix/zentao#{{branchNum}}  origin/bugfix/zentao#{{branchNum}}`,
      'system',
      sd.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
      0
    ]
  ]
}
module.exports = initData
