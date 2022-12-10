import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
//moduleadmin
import mainAdmin from '../views/admin/index.vue'
import handlecount from '../views/admin/account.vue'
import indexacte from '../views/admin/indexacte.vue'
import login from '../views/Authentification/login.vue'
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [

  {
    path: '/login',
    name: 'login',
    component: login
  },

  //moduleAdmin
  {
    path: '/admin/',
    name: 'admin',
    component: mainAdmin,
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: 'handlecount',
    name: 'accounts',
    component: handlecount,
    children: [
      {
        path: 'add',
        name: 'addaccount',
        props: true,
        component: () => import('../views/admin/addaccount.vue')
      },
      {
        path: 'listusers',
        name: 'listusers',
        component: () => import('../views/admin/listusers.vue'),
        props: true
      },
      {
        path: 'editaccount/:id',
        name: 'editaccount',
        component: () => import('../views/admin/editaccount.vue'),
        props: true
      }
    ]
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: mainAdmin
  },
  {
    path: 'message',
    name: 'message',
    component: () => import('../views/admin/adminMsg.vue')
  },
  {
    path: 'error',
    name: 'notfound',
    component: () => import('@/components/notfound.vue')
  },
  {
    path: 'indexacte',
    name: 'indexacte',
    props: true,
    component: indexacte,
    children: [
      {
        path: 'listeacte',
        name: 'listeacte',
        component: () => import('../views/admin/listeacte.vue'),
        props: true
      },
      {
        path: 'showacte/:id',
        name: 'showacte',
        component: () => import('../views/admin/showacte.vue'),
        props: true,
      },
    ]
  },
  {
    path: 'infoadmin',
    name: 'infoadmin',
    component: () => import('../views/admin/accountAdmin.vue')
  },

  {
    path: 'indexacteborning',
    name: 'indexacteborning',
    component: () => import('../views/acte/indexActe.vue'),
    children: [
      {
        path: 'edit/:id',
        name: 'editActe',
        component: () => import('../views/acte/editActe.vue'),
        props: true,
      },
      {
        path: 'newActe',
        name: 'newActe',
        component: () => import('../views/acte/newActe.vue'),
        props: true,
      },
      {
        path: 'listeActe',
        name: 'listeActe',
        component: () => import('../views/acte/listeActe.vue'),
        props: true,
      },
      {
        path: 'visualize/:id',
        name: 'visualize',
        component: () => import('../views/acte/showandprint.vue'),
        props: true,
      },
      {
        path: 'printActe/:id',
        name: 'printActe',
        component: () => import('../views/acte/printActe.vue'),
      }
    ]
  },
  {
    path: 'externaldeclarant',
    name: "externaldeclarant",
    component: () => import('../views/declarant/externaldeclarant.vue')
  },

  {
    path: 'indexdeclarant',
    name: 'indexdeclarant',
    component: () => import('../views/declarant/index.vue'),
    children: [
      {
        path: 'edit/:idDecl',
        name: 'editclarant',
        component: () => import('../views/declarant/edit.vue'),
      },
      {
        path: 'newdeclarant',
        name: 'newdeclarant',
        component: () => import('../views/declarant/new.vue'),
      },
      {
        path: 'listedeclarant',
        name: 'listedeclarant',
        component: () => import('../views/declarant/liste.vue'),
        props: true,
      },
    ]
  },
  {
    path: 'indexMsg',
    name: 'indexMsg',
    component: () => import('../views/messages/indexMsg.vue'),
    children: [
      {
        path: 'showmessage/:id',
        name: 'showmessage',
        component: () => import('../views/messages/showmessage.vue'),
        props: true,
      },
      {
        path: 'newmessage',
        name: 'newmessage',
        component: () => import('../views/messages/newmessage.vue'),
        props: true,
      },
      {
        path: 'listemessage',
        name: 'listemessage',
        component: () => import('../views/messages/listemessage.vue'),
        props: true,
      },
    ]
  },


]
const router = new VueRouter({
  //  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
