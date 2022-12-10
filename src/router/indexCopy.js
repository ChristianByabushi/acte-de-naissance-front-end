import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
	{
		path: '/',
	    name: 'admin',
		component: () => import('@/views/admin/index.vue'),
		props:true, 
		meta:{requireAuth : true }, 
		children:[
			{
				path:'index', 
				name : 'listeUsers', 
				component: () => import('@/views/admin/listeusers')
			}, 

			{
				path :'', 
				component : listeUsers 				
			}, 
			{
				path : 'new', 
				name:'newuser', 
				component : newuser
			}, 
			{
				path : ':id', 
				name : 'show', 
				component : infoAgent, 
				props:true
			}
		]
	}, 

	{
		path : '/agent', 
		name : 'agent',  
		component: () => import('@/views/admin/listeusers')
		
	}

  ]	

})

// const routes: Array<RouteConfig> = [
// 	{
// 	  path: '/',
// 	  name: 'dashboard',
// 	  component: () => import('@/views/Dashboard/index.vue')
  
// 	},
// 	{
// 	  path: '/merchandise',
// 	  name: 'merchandise',
// 	  component: () => import('@/views/merchandise/menu_merchandise.vue')
// 	},
// 	{
// 	  path: '/invoice',
// 	  name: 'invoice',
// 	  component: () => import('@/views/invoices/invoice.vue')
  
// 	},
// 	{
// 	  path: '/analysis',
// 	  name: 'analysis',
// 	  component: () => import('@/views/analysis/analysis.vue')
// 	},
// 	{
// 	  path: '/account',
// 	  name: 'account',
// 	  component: () => import('@/views/Authentification/account.vue')
// 	},
// 	{
// 	  path: '/login',
// 	  name: 'login',
// 	  component: login
// 	},
//   ]
//   const router = new VueRouter({
// 	mode: 'history',
// 	base: process.env.BASE_URL,
// 	routes
//   }) 