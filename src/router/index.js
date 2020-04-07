/*
 * @Description:路由控制
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-06-05 18:57:53
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-07 19:16:56
 */
import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/layout/Layout.vue'
const Home = () => import('@/views/home/Home.vue')
const ProjectManage = () => import('@/views/projectManage/projectManage.vue')
const ProjectInit = () =>
  import('@/views/projectManage/projectInit/ProjectInit.vue')
// const templateManage = () => {
//   import('@/views/templateManage/templateManage.vue')
// }
import templateManage from '@/views/templateManage/templateManage.vue'
import componentManage from '@/views/componentManage/componentManage.vue'
// const TerminalView = () => import('components/terminal/TerminalView.vue')
Vue.use(Router)
const vueRouter = new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            title: '首页',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/project',
      name: 'project',
      redirect: '/project/projectManage',
      component: MainLayout,
      meta: {
        title: '项目管理'
      },
      children: [
        {
          path: 'projectManage',
          component: ProjectManage,
          name: 'projectManage',
          meta: {
            title: '项目列表',
            noCache: true
          }
        },
        {
          path: 'projectInit',
          component: ProjectInit,
          name: 'projectInit',
          meta: {
            title: '项目初始化',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/template',
      name: 'template',
      redirect: '/template/templateManage',
      component: MainLayout,
      meta: {
        title: '模板管理'
      },
      children: [
        {
          path: 'templateManage',
          component: templateManage,
          name: 'templateManage',
          meta: {
            title: '模板列表',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/comp',
      name: 'comp',
      redirect: '/comp/componentManage',
      component: MainLayout,
      meta: {
        title: '组件管理'
      },
      children: [
        {
          path: 'componentManage',
          component: componentManage,
          name: 'componentManage',
          meta: {
            title: '组件列表',
            noCache: true
          }
        }
      ]
    }
    // {
    //   path: '/terminal',
    //   name: 'terminal',
    //   redirect: '/terminal/terminalManage',
    //   component: MainLayout,
    //   children: [
    //     {
    //       path: 'terminalManage',
    //       component: ProjectInit,
    //       name: 'projectInit',
    //     },
    //   ],
    // },
  ]
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// vueRouter.beforeEach(function (to, from, next) {
//   // const nextRoute = ['控制台', '仪表盘']
//   // const auth = localStorage.getItem('userId')
//   // // 跳转至上述3个页面
//   // if (nextRoute.indexOf(to.name) >= 0) {
//   //   // 未登录
//   //   if (!auth) {
//   //     vueRouter.push({ path: '/login' })
//   //   }
//   // }
//   // // 已登录的情况再去登录页，跳转至首页
//   // if (to.name === 'login') {
//   //   if (auth.IsLogin) {
//   //     vueRouter.push({ path: '' })
//   //   }
//   // }
//   next()
// })
export default vueRouter
