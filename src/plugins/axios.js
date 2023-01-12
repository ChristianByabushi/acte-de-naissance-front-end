import Vue from 'vue'
import axios from 'axios' 
import 'vue-axios'
import { Store } from 'vuex'
axios.interceptors.request.use((config)=>{
	const token = localStorage.getItem('token')
	if(token){
		config.headers['Authorization'] = "Bearer "+ token
	}
	return config
}) 

axios.interceptors.response.use(
	function (response){
		return response
	},
	function (error){
		if(error.response.status === 401){
			Store.dispatch('logout');
		}else{
			return Promise.reject(error)
		}
	}
)