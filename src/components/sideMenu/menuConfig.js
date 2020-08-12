/*
 * @Descripttion: 
 * @version: 
 * @Author: pym
 * @Date: 2020-08-11 10:20:11
 * @LastEditors: pym
 * @LastEditTime: 2020-08-11 10:22:55
 */
const menuTree = [
  { name: 'home', path: '/home', icon: 'icon-shouye', label: '首页' },
  {
    name: 'projectManage',
    path: '/project/projectManage',
    icon: 'icon-xiangmu',
    label: '项目管理'
  },
  {
    name: 'templateManage',
    path: '/template/templateManage',
    icon: 'icon-mobanguanli1',
    label: '模板管理'
  },
  {
    name: 'componentManage',
    path: '/comp/componentManage',
    icon: 'icon-mobanguanli',
    label: '组件管理'
  },
  {
    name: 'scriptManage',
    path: '/script/scriptManage',
    icon: 'icon-jiaoben',
    label: '脚本管理'
  },
  {
    name: 'toolsManage',
    path: '/tools/toolsManage',
    icon: 'icon-gongju',
    label: '工具管理'
  },
  {
    name: 'dragManage',
    path: '/drag/dragManage',
    icon: 'icon-oper-auto',
    label: '拖拽生成'
  },
  {
    name: 'automatedTesting',
    path: '/test/automatedTesting',
    icon: 'icon-xinicon_huabanfuben',
    label: '自动化测试'
  },
  {
    name: 'devOps',
    path: '/devOps/Monitor',
    icon: 'icon-keshihua',
    label: '运维监控'
  },
  {
    name: 'systemManage',
    path: '/system/userManage',
    icon: 'icon-shezhi',
    label: '系统设置',
    children:[
      {
        name: 'userManage',
        path: '/system/userManage',
        label: '用户管理'
      },
      {
        name: 'serviceSet',
        path: '/system/serviceSet',
        label: '服务设置'
      }
    ]
  }
]

export default menuTree