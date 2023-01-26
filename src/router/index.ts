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
    path: 'index-fonction',
    name: 'indexfonction',
    component: () => import('../views/fonction/index-fonction.vue'),
    children: [
      {
        path: 'edit-fonction/:id',
        name: 'editfonction',
        component: () => import('../views/fonction/edit-fonction.vue'), 
        props: true,
      }, 
      {
        path: 'new-fonction',
        name: 'newfonction',
        component: () => import('../views/fonction/new-fonction.vue'),
        props: true,
      },
      {
        path : 'list-fonction',
        name :'indexfonction', 
        component: () => import('../views/fonction/liste-fonction.vue'),
        props : true
      }
    ]
  },

  {
    path: 'index-dette',
    name: 'indexdette',
    component: () => import('../views/dette/index-dette.vue'),
    children: [
      {
        path: 'edit-dette/:id',
        name: 'editdette',
        component: () => import('../views/dette/edit-dette.vue'), 
        props: true,
      }, 
      {
        path: 'new-dette',
        name: 'newdette',
        component: () => import('../views/dette/new-dette.vue'),
        props: true,
      },
      {
        path : 'list-dette',
        name :'indexdette', 
        component: () => import('../views/dette/liste-dette.vue'),
        props : true
      }
    ]
  },
  {
    path: 'index-absence',
    name: 'indexabsence',
    component: () => import('../views/absence/index-absence.vue'),
    children: [
      {
        path: 'edit-absence/:id',
        name: 'editabsence',
        component: () => import('../views/absence/edit-absence.vue'), 
        props: true,
      }, 
      {
        path: 'new-absence',
        name: 'newabsence',
        component: () => import('../views/absence/new-absence.vue'),
        props: true,
      },
      {
        path : 'list-absence',
        name :'indexabsence', 
        component: () => import('../views/absence/liste-absence.vue'),
        props : true
      }
    ]
  },

  {
    path: 'index-nutrition',
    name: 'indexnutrition',
    component: () => import('../views/nutrition/index-nutrition.vue'),
    children: [
      {
        path: 'edit-nutrition/:id',
        name: 'editnutrition',
        component: () => import('../views/nutrition/edit-nutrition.vue'),
        props: true,
      }, 
      {
        path: 'new-nutrition',
        name: 'newnutrition',
        component: () => import('../views/nutrition/new-nutrition.vue'),
        props: true,
      },
      {
        path : 'list-nutrition',
        name :'indexnutrition', 
        component: () => import('../views/nutrition/liste-nutrition.vue'),
        props : true
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
