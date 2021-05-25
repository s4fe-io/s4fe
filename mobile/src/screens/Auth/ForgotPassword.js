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
import {Icon, Container, Content} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import {Axios} from '../../utils/axios'
import {API} from '../../utils/api'
import ValidationComponent from 'react-native-form-validator'

export default class SignIn extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			dataLoading: false,
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

	goToScreen(screen, data) {
		this.props.navigation.navigate(screen)
	}

	forgotPassword() {
		const isValid = this.validate({
			email: {email: true, required: true},
		})
		if (isValid) {
			this.setState({dataLoading: true})
			const formData = {
				email: this.state.email,
			}
			Axios.post(API.FORGOT_PASSWORD, formData)
				.then(res => {
					this.setState({dataLoading: false})
					Alert.alert('Info', 'Please check your inbox for the password reset link')
					this.goToScreen('LogIn')
				})
				.catch(err => {
					console.log(err.response)
					const email = err.response.data.email.email
					if (email.lenght > 0) {
						Alert.alert('Warning', email[0])
					} else {
						Alert.alert('Warning', 'Something went wrong, please try again.')
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
			<Container>
				<View style={styles.background}>
					<ImageBackground
						style={styles.rect}
						imageStyle={styles.rect_imageStyle}
						source={require('../../assets/images/Gradient_EsLX0zX.png')}
					/>
				</View>
				<SafeAreaView style={styles.container}>
					<View style={styles.root}>
						<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
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
							<View style={styles.background}>
								<ImageBackground
									style={styles.rect}
									imageStyle={styles.rect_imageStyle}
									source={require('../../assets/images/Gradient_EsLX0zX.png')}
								/>
							</View>
							<View style={{alignItems: 'center'}}>
								<Text style={styles.startUsingS5}>FORGOT PASSWORD</Text>
								<Text style={styles.textDescription}>
									Enter your email and we will send you the instructions how to
									reset your password.
								</Text>
							</View>
							<Content style={styles.scrollView}>
								<View contentContainerStyle={{flexGrow: 1}}>
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
										<View style={styles.groupFiller}>
											<TouchableOpacity
												style={styles.button}
												onPress={() => {
													this.forgotPassword()
												}}>
												<Text style={styles.next}>Reset</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</Content>
						</View>
					</View>
				</SafeAreaView>
			</Container>
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
	textDescription: {
		color: 'rgba(255,255,255,1)',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20
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
