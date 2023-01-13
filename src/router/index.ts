import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
//moduleadmin
import mainAdmin from '../views/admin/index.vue'
import handlecount from '../views/admin/account.vue'
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
    path: 'infoadmin',
    name: 'infoadmin',
    component: () => import('../views/admin/accountAdmin.vue')
  },

  

  {
    path: 'index-enfant',
    name: 'indexenfant',
    component: () => import('../views/enfant/index-enfant.vue'),
    children: [
      {
        path: 'edit-enfant/:id',
        name: 'editenfant',
        component: () => import('../views/enfant/edit-enfant.vue'),
        props: true,
      }, 
      {
        path: 'new-enfant',
        name: 'newenfant',
        component: () => import('../views/enfant/new-enfant.vue'),
        props: true,
      },
      {
        path : 'list-enfant',
        name :'indexenfant', 
        component: () => import('../views/enfant/liste-enfant.vue'),
        props : true
      }
    ]
  },
  {
    path: 'index-malade',
    name: 'indexmalade',
    component: () => import('../views/malade/index-malade.vue'),
    children: [
      {
        path: 'edit-malade/:id',
        name: 'editmalade',
        component: () => import('../views/malade/edit-malade.vue'),
        props: true,
      }, 
      {
        path: 'new-malade',
        name: 'newmalade',
        component: () => import('../views/malade/new-malade.vue'),
        props: true,
      },
      {
        path : 'list-malade',
        name :'indexmalade', 
        component: () => import('../views/malade/liste-malade.vue'),
        props : true
      }
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
        name: 'indexMsg',
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
