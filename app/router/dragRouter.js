/*
 * @Description: 路由
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:45:35
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-10 23:17:39
 */
const controller = require('../controller/controller.js')
module.exports = router => {
  // 获取拖拽组件列表
  router.get('/api/drag/queryTodoList', controller.queryTodoList)
  // 新增待办列表
  router.post('/api/drag/insertTodoList', controller.insertTodoList)
}
