import Vue from 'vue' 
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/free-solid-svg-icons'
import 'vue-material'
import 'material-icons/iconfont/material-icons.css';
Vue.config.productionTip = false 
axios.defaults.baseURL = 'http://localhost/remuneration/public/'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({ 
  router, 
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
