import axios from 'axios';
import Cookies from 'js-cookie'
const API_URL = "http://localhost:5000"


const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})


instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})