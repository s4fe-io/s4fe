import * as React from 'react'
import {ActivityIndicator, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Settings from './SettingsScreen'
import Items from './ItemsScreen'
import ScanTag from './ScanTagScreen'
import HomeScreen from './Home'
import SignUpScreen from './SignUp'
import EnterPin from './SignUp/EnterPin'
import Register from './SignUp/Register'
import UserProfile from './UserProfile'
import AsyncStorage from '@react-native-community/async-storage'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSignedIn: true,
		}
	}
	getToken = async () => {
		try {
			const value = await AsyncStorage.getItem('tokenData')
			console.log('TOKEN DATA', value)
			if (value !== null) {
				return value
			}
		} catch (e) {
			// error reading value
		}
	}

	AuthLoadingScreen = () => {
		this.getToken()
			.then(res => {
				if (!res) {
					console.log('User not loged in')
					this.setState({
						isSignedIn: false,
					})
				} else {
					console.log(res ? 'logged in' : 'false', res)
					this.setState({
						isSignedIn: true,
					})
				}
			})
			.catch(err => {
				console.log('nema tokena', err)
				this.setState({
					isSignedIn: false,
				})
			})
	}

	componentDidMount(): void {
		this.AuthLoadingScreen()
	}

	render() {
		const Stack = createStackNavigator()

		return this.state.isSignedIn ? (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Items" component={Items} />
					<Stack.Screen name="Scan Tag" component={ScanTag} />
					<Stack.Screen name="Settings" component={Settings} />
					<Stack.Screen name="UserProfile" component={UserProfile} />
				</Stack.Navigator>
			</NavigationContainer>
		) : (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name="Home" component={SignUpScreen} />
					<Stack.Screen name="EnterPin" component={EnterPin} />
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}
