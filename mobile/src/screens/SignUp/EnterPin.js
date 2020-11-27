import React, {Component} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Text,
	Dimensions,
	Alert,
} from 'react-native'
import {Button, Icon} from 'native-base'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import ValidationComponent from 'react-native-form-validator'
import {Axios} from '../../utils/axios'
import {API} from '../../utils/api'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class EnterPin extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			phoneNumber: 0,
			verificationCode: '',
		}
		this.inputRef = React.createRef()
		// this.state.phoneNumber = this.props.navigation.getParam('phoneNumber')
	}

	handleChange = value => {
		this.setState({verificationCode: value})
	}

	sendOTP() {
		const formData = {
			otp: this.state.verificationCode,
		}
		Axios.post(API.REGISTRATION, formData)
			.then(() => {
				console.log('success')
			})
			.catch(e => {
				console.log(e)
				console.log(e.response)
				const error = e.response
				if (error.status === 500) {
					Alert.alert(
						'Error!',
						'Make sure that you have entered the correct code.',
					)
				} else {
					console.log('go to next screen')
					this.props.navigation.navigate('Register', {
						phoneVerificationData: this.state,
					})
				}
			})
	}

	handleNext(phoneNumber) {
		const isValid = this.validate({
			phoneNumber: {required: true},
			verificationCode: {required: true},
		})
		if (isValid) {
			// this.sendOTP()
			this.props.navigation.navigate('Register', {
				phoneNumber,
				verificationCode: this.state.verificationCode
			})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}
	focus = () => {
		this.inputRef.focus()
	}

	render() {
		const {navigation} = this.props
		const phoneNumber = navigation.getParam('phoneNumber')

		return (
			<View style={styles.root}>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				{/* Back Arrow */}
				<View style={{backgroundColor: Colors.PRIMARY, padding: 20}}>
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
						<Text style={styles.startUsingS5}>
							Please enter the 4 digit code{'\n'}sent to your number
						</Text>
					</View>
					<View style={styles.form}>
						<View style={styles.group}>
							<Icon name="keypad" style={styles.icon24} />
							<TextInput
								keyboardType="number-pad"
								placeholder="Enter the code"
								placeholderTextColor="rgba(255,255,255,1)"
								secureTextEntry={false}
								style={styles.textInput}
								onChangeText={text => this.handleChange(text)}
							/>
						</View>

						<View style={styles.groupFiller}>
							<TouchableOpacity
								onPress={() => this.handleNext(phoneNumber)}
								style={styles.button}>
								<Text style={styles.next}>NEXT</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.footerTexts1}>
							<TouchableOpacity
								onPress={() => navigation.pop()}
								style={styles.button3}>
								<Text style={styles.createAccount1}>
									You haven&#39;t received a code?{'\n'}Edit your phone number
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
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
		top: height * 0.1,
		height: 235,
		marginLeft: 50,
		marginRight: 50,
	},
	group: {
		height: 59,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
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
		marginTop: 20,
		flex: 1,
	},
	footerTexts1: {
		height: 43,
		justifyContent: 'center',
		marginBottom: 5,
	},
	button3: {
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
})
