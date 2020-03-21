/*
 * @Description:路由控制
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-06-05 18:57:53
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-18 22:20:58
 */
import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/layout/Layout.vue'
const Home = () => import('@/views/home/Home.vue')
const ProjectManage = () => import('@/views/projectManage/projectManage.vue')
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
          name: '主页',
          component: Home,
          meta: {
            title: 'Home',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/projectManage',
      name: '项目管理',
      component: MainLayout,
      children: [
        {
          path: '',
          component: ProjectManage,
          name: '项目管理'
        }
      ]
    }
  ]
})

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
