/*
 * @Description: 路由
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:45:35
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-11 15:53:40
 */
const controller = require('../controller/dragController.js')
module.exports = router => {
  // 获取拖拽组件列表
  router.get('/api/drag/getPageList', controller.getPageList)
  // 新增待办列表
  router.post('/api/drag/insertPage', controller.insertPage)
  // 获取预览信息
  router.post('/api/drag/templateInfo', controller.getTemplateInfo)
}
