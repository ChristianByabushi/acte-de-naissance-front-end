import axios from 'axios';
const axiosClient = axios.create({
	baseURL: 'http://localhost/remuneration/public/'
})

axiosClient.interceptors.request.use(config => {
	axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
	//config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default axiosClient