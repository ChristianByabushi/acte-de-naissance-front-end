import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import login from '../views/Authentification/login.vue'
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/index.vue')

  },
  {
    path: '/merchandise',
    name: 'merchandise',
    component: () => import('@/views/merchandise/menu_merchandise.vue')
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('@/views/invoices/invoice.vue')

  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@/views/analysis/analysis.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Authentification/account.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach(async (to, from) => {
//   if (
//     // make sure the user is authenticated
//      !localStorage.getItem('token') &&
//     //  Avoid an infinite redirect
//     to.name !== 'login'
//   ) {
//     // redirect the user to the login page
//     return { name: '/login' } 
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !localStorage.getItem('token'))
//     next('/login')
// })



export default router
