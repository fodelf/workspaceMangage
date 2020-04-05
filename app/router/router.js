/*
 * @Description: 路由
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:45:35
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-05 17:03:38
 */
const controller = require('../controller/controller.js')
module.exports = router => {
  router.get('/api/getIndexCount', controller.getIndexCount)
  router.get('/api/getProjectType', controller.getProjectType)
}
