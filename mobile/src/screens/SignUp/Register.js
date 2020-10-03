import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Text,
	Dimensions,
	ScrollView,
	SafeAreaView,
	Alert,
	AsyncStorage,
} from 'react-native'
import {Button, Icon} from 'native-base'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
// import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Register extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			firstName: '',
			lastName: '',
			password1: '',
			password2: '',
		}
	}

	handleChange = (model, value) => {
		this.setState({[model]: value})
	}

	register(
		email,
		first_name,
		last_name,
		password1,
		password2,
		phone_number,
		otp,
	) {
		const isValid = this.validate({
			phoneNumber: {numbers: true, required: true},
			verificationCode: {numbers: true, required: true},
			email: {email: true, required: true},
			firstName: {required: true},
			lastName: {required: true},
			password1: {required: true},
			password2: {required: true},
		})
		if (isValid) {
			const formData = {
				email,
				first_name,
				last_name,
				password1,
				password2,
				phone_number,
				otp,
			}

			console.log('formData', formData)
			Axios.post(`${API.REGISTRATION}`, formData)
				.then(res => {
					console.log('res user added', res)
					this.storeData('tokenData', res.data.key)
					this.storeData('userData', JSON.stringify(res.data))
					this.goToScreen('UserProfile', res.data)
				})
				.catch(err => {
					console.log('err', err.response)
					const error = err.response
					if (error.data.otp) {
						Alert.alert(
							'Wrong verification code!',
							'Make sure that you have entered the correct verification number.',
						)
					} else if (error.data.email) {
						Alert.alert('Warning!', error.data.email[0])
					} else if (error.data.password1) {
						Alert.alert('Warning!', error.data.password1[0])
					} else if (error.data.password2) {
						Alert.alert('Warning!', error.data.password2[0])
					} else if (error.data.non_field_errors) {
						Alert.alert('Warning!', error.data.non_field_errors[0])
					}
					else {
						Alert.alert('Warning!', 'Something went wrong!')
					}
				})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}

	storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	goToScreen(screen, user) {
		this.props.navigation.navigate(screen, {
			userData: user,
		})
	}
	render() {
		const {navigation} = this.props
		const phoneNumber = navigation.getParam('phoneNumber')
		const verificationCode = navigation.getParam('verificationCode')
		const {email, firstName, lastName, password1, password2} = this.state

		console.log('verificationCode, phone', verificationCode, phoneNumber)
		return (
			<Fragment>
				<SafeAreaView style={styles.container}>
					<View style={styles.root}>
						<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
						{/* Back button */}
						<View style={{backgroundColor: Colors.PRIMARY, padding: 20}}>
							<Icon
								name="arrow-back"
								style={{color: 'white'}}
								onPress={() => {
									navigation.pop()
								}}
							/>
						</View>

						<View style={styles.backgroundStack}>
							<View style={styles.background}>
								<ImageBackground
									style={styles.rect}
									imageStyle={styles.rect_imageStyle}
									source={require('../../assets/images/Gradient_EsLX0zX.png')}
								/>
							</View>
							<View style={{alignItems: 'center'}}>
								<Text style={styles.startUsingS5}>CREATE ACCOUNT</Text>
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
										{/* First name */}
										<View style={styles.group}>
											<EvilIconsIcon name="user" style={styles.icon} />
											<TextInput
												placeholder="First name"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={false}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('firstName', value)
												}
											/>
										</View>
										{/*Last name*/}
										<View style={styles.group}>
											<EvilIconsIcon name="user" style={styles.icon} />
											<TextInput
												placeholder="Last name"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={false}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('lastName', value)
												}
											/>
										</View>
										{/*Password*/}
										<View style={styles.group}>
											<EvilIconsIcon name="lock" style={styles.icon} />
											<TextInput
												placeholder="Password"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={true}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('password1', value)
												}
											/>
										</View>
										{/*Repeat password */}
										<View style={styles.group}>
											<EvilIconsIcon name="lock" style={styles.icon} />
											<TextInput
												placeholder="Repeat password"
												placeholderTextColor="rgba(255,255,255,1)"
												secureTextEntry={true}
												style={styles.textInput}
												onChangeText={value =>
													this.handleChange('password2', value)
												}
											/>
										</View>
										<View style={styles.groupFiller}>
											<TouchableOpacity
												onPress={() =>
													this.register(
														email,
														firstName,
														lastName,
														password1,
														password2,
														phoneNumber,
														verificationCode,
													)
												}
												style={styles.button}>
												<Text style={styles.next}>NEXT</Text>
											</TouchableOpacity>
										</View>
										<View style={styles.footerTexts1}>
											<Text style={styles.createAccount1}>
												By registering you are accepting our Terms and
												Conditions.
											</Text>
											{/*	 Privacy */}
											<TouchableOpacity onPress={() => navigation.navigate('')}>
												<Text style={styles.terms}>Terms and Conditions</Text>
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
		backgroundColor: 'rgb(255,255,255)',
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
		marginBottom: 40,
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
