/*
 * @Description: 路由
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 15:45:35
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 11:35:52
 */
const controller = require('../controller/controller.js')
module.exports = router => {
  // 获取首页汇总
  router.get('/api/home/getIndexCount', controller.getIndexCount)
  // 获取待办列表
  router.get('/api/home/queryTodoList', controller.queryTodoList)
  // 新增待办列表
  router.post('/api/home/insertTodoList', controller.insertTodoList)
  // 获取待办列表
  router.get('/api/home/queryIndexTrend', controller.queryIndexTrend)
   // 获取个人动态列表
  router.get('/api/home/getPersonActive', controller.getPersonActive)
  // 获取项目类型
  router.get('/api/getProjectType', controller.getProjectType)
  // 改变代办列表
  router.post('/api/home/changeTodoList', controller.changeTodoList)
  // 新建项目
  router.post('/api/initNewProject', controller.initNewProject)
  // 获取项目列表
  router.get('/api/getProjectList', controller.getProjectList)
  // 执行项目脚本
  router.post('/api/project/action', controller.projectAction)
  // 获取项目汇总列表
  router.get('/api/getProjectSum', controller.getProjectSum)
  // 新增模板
  router.post('/api/template/newTemplate', controller.newTemplate)
  // 模板列表查询
  router.get('/api/template/queryTemplateList', controller.queryTemplateList)
  // 模板汇总查询
  router.get('/api/template/queryTemplateSum', controller.queryTemplateSum)
  // 模板组件列表查询
  router.get('/api/component/queryComponentList', controller.queryComponentList)
  // 模板组件汇总查询
  router.get('/api/component/queryComponentSum', controller.queryComponentSum)
  // 新增组件
  router.post('/api/component/insertComponent', controller.insertComponent)
  // 修改组件
  router.post('/api/component/updateComponent', controller.updateComp)
  // 修改组件
  router.post('/api/component/deleteComponent', controller.deleteComponent)
  // 获取用户
  router.get('/api/queryUser', controller.queryUser)
  // 获取用户
  router.get('/api/script/queryScriptList', controller.queryScriptList)
  // 新增脚本
  router.post('/api/script/insertScript', controller.insertScript)
  // 执行脚本
  router.post('/api/script/actionScript', controller.actionScript)
  // 删除脚本
  router.post('/api/script/deleteScript', controller.deleteScript)
  // 修改脚本
  router.post('/api/script/updateScript', controller.updateScript)
  // 修改脚本
  router.post('/api/template/deleteTemp', controller.deleteTemp)
  // 修改脚本
  router.post('/api/template/updateTemp', controller.updateTemp)
  // 删除项目
  router.post('/api/project/deleteProject', controller.deleteProject)
  // 删除项目
  router.post('/api/project/updateProject', controller.updateProject)
  // 获取工具列表
  router.get('/api/tool/queryToolsList', controller.queryToolsList)
}
