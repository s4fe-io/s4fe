import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Text,
	SafeAreaView,
	ScrollView,
	Alert,
	AsyncStorage,
} from 'react-native'
import {Center} from '@builderx/utils'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import {Axios} from '../../utils/axios'
import {API} from '../../utils/api'
import ValidationComponent from 'react-native-form-validator'

import {
	LoginButton,
	AccessToken,
	LoginManager
} from 'react-native-fbsdk';
import {acc} from "react-native-reanimated";


export default class SignIn extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			email: 'dj.shone@gmail.com',
			password: '22sep2008',
			dataLoading: false,
			userInfo: {}
		}
	}



	// Store data
	storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	handleChange = (name, value) => {
		this.setState({[name]: value})
	}

	facebookLogin = (accessToken) => {
		const formData = {
			access_token: accessToken
		}
		console.log('form', formData)
		Axios.post(API.FACEBOOK, formData).then(res => {
			console.log('Res', res)
			this.storeData('tokenData', res.data.key)
			this.storeData('userData', JSON.stringify(res.data))
			this.goToScreen('UserProfile', res.data)
		}, err => {
			Alert.alert('Warning', JSON.stringify(err))
		})
	}

	handleFacebookLogin () {
		LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
			(result) => {
				if (result.isCancelled) {
					console.log('Login cancelled')
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const accessToken = data.accessToken.toString()
						this.facebookLogin(accessToken)
						console.log('access token', accessToken)
						// this.getInfoFromToken(accessToken);
					})
					console.log('Login success with permissions: ' + result.grantedPermissions.toString())
				}
			},
			function (error) {
				console.log('Login fail with error: ' + error)
			}
		)
	}

	goToScreen(screen, data) {
		this.props.navigation.navigate(screen, {
			userData: data,
		})
	}

	// Phone verification
	login() {
		const isValid = this.validate({
			email: {email: true, required: true},
			password: {required: true},
		})
		if (isValid) {
			this.setState({dataLoading: true})
			const formData = {
				email: this.state.email,
				password: this.state.password,
			}
			Axios.post(API.LOGIN, formData)
				.then(res => {
					console.log('res', res)
					this.setState({dataLoading: false})
					this.storeData('tokenData', res.data.key)
					this.storeData('userData', JSON.stringify(res.data))
					this.goToScreen('UserProfile', res.data)
				})
				.catch(err => {
					console.log(err.response)
					const nonFieldErrors = err.response.data.non_field_errors
					if (nonFieldErrors) {
						Alert.alert('Warning', nonFieldErrors[0])
					}
					this.setState({dataLoading: false})
					// Alert.alert('Warning!', 'Something went wrong!')
				})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}

	render() {
		const {navigation} = this.props
		const {email, password} = this.state

		return (
			<Fragment>
				<View style={styles.background}>
					<ImageBackground
						style={styles.rect}
						imageStyle={styles.rect_imageStyle}
						source={require('../../assets/images/Gradient_EsLX0zX.png')}
					/>
				</View>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				<SafeAreaView style={styles.container}>
					<View style={styles.root}>
						{/* Back button */}
						<View style={{padding: 20}}>
							<Icon
								type="MaterialIcons"
								name="arrow-back"
								style={{color: 'white'}}
								onPress={() => {
									navigation.pop()
								}}
							/>
						</View>

						<View style={styles.backgroundStack}>
							<View style={{alignItems: 'center'}}>
								<Text style={styles.startUsingS5}>SIGN IN</Text>
							</View>
							<ScrollView style={styles.scrollView}>
								<KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
									<View style={styles.form}>
										<View style={styles.group}>
											<EvilIconsIcon name="envelope" style={styles.icon} />
											<TextInput
												autoCapitalize="none"
												keyboardType="email-address"
												placeholder="Email"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={false}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('email', value)
												}
											/>
										</View>
										{/* Password */}
										<View style={styles.group}>
											<EvilIconsIcon name="user" style={styles.icon} />
											<TextInput
												placeholder="Password"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={true}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('password', value)
												}
											/>
										</View>
										<View style={styles.groupFiller}>
											<TouchableOpacity
												style={styles.button}
												onPress={() => {
													this.login()
												}}>
												<Text style={styles.next}>Sign In</Text>
											</TouchableOpacity>
										</View>
										<View style={{marginTop: 2, marginBottom: 30}}>
											<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
											<Text style={styles.createAccount1}>
												Forgot password
											</Text>
											</TouchableOpacity>

										</View>
										<View style={styles.footerTexts1}>

											<Text style={styles.createAccount1}>
												Login using Social Platforms
											</Text>
											<TouchableOpacity onPress={() => this.handleFacebookLogin()}>
												<Text style={styles.terms}>Facebook </Text>
											</TouchableOpacity>
										</View>
									</View>
								</KeyboardAwareScrollView>
							</ScrollView>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	background: {
		top: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		bottom: 0,
		justifyContent: 'center',
	},
	rect: {
		flex: 1,
	},
	rect_imageStyle: {},
	form: {
		padding: 40,
	},
	group: {
		height: 59,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
		marginBottom: 10,
	},
	icon24: {
		color: 'rgba(255,255,255,1)',
		fontSize: 30,
		marginLeft: 20,
		alignSelf: 'center',
	},
	textInput: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 5,
		justifyContent: 'center',
	},
	next: {
		color: 'rgba(111,111,111,1)',
		fontSize: 18,
		alignSelf: 'center',
	},
	groupFiller: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10,
	},
	footerTexts1: {
		justifyContent: 'center',
		marginBottom: 5,
	},
	button3: {
		width: 221,
		height: 36,
		alignSelf: 'center',
	},
	createAccount1Filler: {
		flex: 1,
	},
	createAccount1: {
		color: 'rgba(255,255,255,0.5)',
		fontSize: 16,
	},
	startUsingS5: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		textAlign: 'center',
	},
	icon23: {
		top: 26,
		left: 19,
		position: 'absolute',
		color: 'rgba(255,255,255,1)',
		fontSize: 30,
	},
	backgroundStack: {
		flex: 1,
	},

	icon: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	container: {flex: 1},
	terms: {
		color: 'rgba(255,255,255,0.5)',
		marginTop: 20,
		marginBottom: 20,
	},
})
