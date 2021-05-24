import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const Axios = axios.create({
	baseURL: 'https://s4fe.herokuapp.com/',
	// headers: {Authorization: 'Bearer ' + authorization},
})

Axios.interceptors.request.use(
	async config => {
		const token = await AsyncStorage.getItem('tokenData')
		console.log('TOKEN IZ AXIOS', token)
		if (token) {
			// console.log('token iz if iz intercept', token)
			config.headers.Authorization = 'Token ' + token
		}
		return config
	},
	error => {
		return Promise.reject(error)
	},
)

Axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		console.log('error axios', error.response)
		if (error.response.status === 401) {
			console.log('401 je')
			logout()
			// NavigationService.navigate('Login');
		}
		return Promise.reject(error)
	},
)

const logout = async () => {
	console.log('logout')
	try {
		await AsyncStorage.multiRemove(['tokenData', 'userData']).then(() => {
			// this.props.navigation.navigate('PhoneNumber')
		})
	} catch (e) {
		// Error saving data
		console.log('logout', e)
	}
}
export {Axios}
