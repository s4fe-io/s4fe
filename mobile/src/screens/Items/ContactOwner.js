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
	Alert, Platform,
} from 'react-native'
import {Center} from '@builderx/utils'
import Colors from '../../constants/Colors'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import FeatherIcon from "react-native-vector-icons/Feather";


export default class PhoneNumber extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}

	componentDidMount() {
	}

	sendMessage () {
		const { message } = this.state
		const { navigation } = this.props
		const user = navigation.getParam('payload')
		const formData = {
			content: message,
			receiver: user.user
		}
		return Axios.post(API.MESSAGES, formData).then(res => {
			navigation.navigate('UserProfile')
			Alert.alert('Thank you.', 'Message is sent to the item owner.')
		}, err => {
			console.log(err)
			console.log(err.response)
			Alert.alert('Warning', JSON.stringify(err.response))
		})
	}

	render() {
		const {navigation} = this.props

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
					<TouchableOpacity
						onPress={() => navigation.pop()}
						style={styles.backButton}>
						<FeatherIcon
							name={'chevron-left'}
							style={styles.backIcon}
						/>
					</TouchableOpacity>
					<View style={styles.root}>

						<View style={styles.backgroundStack}>
							<Center horizontal>
							</Center>
							<View style={styles.titleWrapper}>
								<Text style={styles.contact}>
									Contact the owner
								</Text>
							</View>
							{/* Form */}
							<View style={styles.form}>
								<View>
									<View style={styles.username}>
										<TextInput
											placeholder="Message"
											placeholderTextColor="rgba(255,255,255,1)"
											secureTextEntry={false}
											style={styles.usernameInput}
											onChangeText={value =>
												this.setState({message: value})
											}
										/>
									</View>
								</View>

								<TouchableOpacity
									disabled={this.dataLoading}
									onPress={() => this.sendMessage()}
									style={[styles.button, {marginTop: 30}]}>
									<Text style={styles.text2}>Send</Text>
								</TouchableOpacity>

							</View>

							<View style={styles.footerTexts}>
								<View style={{flex: 1, marginTop: 0}}>
									<TouchableOpacity
										onPress={() => navigation.navigate('SocialAuth')}
										style={styles.button4}>
										<View style={styles.createAccount2Filler} />
										{/*<Text style={styles.createAccount2}>*/}
										{/*	Or connect using social platforms*/}
										{/*</Text>*/}
									</TouchableOpacity>
								</View>
							</View>
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
	},
	rect: {
		flex: 1,
	},
	rect_imageStyle: {},
	form: {
		marginTop: 40,
		margin: 40,
	},
	username1: {
		height: 60,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		// flexDirection: 'row',
	},
	icon23: {
		color: 'rgba(255,255,255,1)',
		fontSize: 30,
		marginLeft: 20,
		alignSelf: 'center',
	},
	usernameInput1: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
	},
	username: {
		height: 60,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
		marginTop: 20,
	},
	icon22: {
		color: 'rgba(255,255,255,1)',
		fontSize: 30,
		marginLeft: 20,
		alignSelf: 'center',
	},
	usernameInput: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 17,
	},
	username1Column: {},
	username1ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 5,
		justifyContent: 'center',
	},
	text2: {
		color: 'rgba(111,111,111,1)',
		fontSize: 18,
		alignSelf: 'center',
	},
	footerTexts: {
		left: 37,
		height: 14,
		position: 'absolute',
		bottom: 58,
	},
	button2Filler: {
		flex: 1,
	},
	button2: {
		width: 221,
		height: 14,
	},
	createAccountFiller: {
		flex: 1,
	},
	createAccount: {
		color: 'rgba(255,255,255,0.5)',
	},
	logo: {
		top: 104,
		width: 102,
		height: 111,
		position: 'absolute',
		left: 129,
	},
	endWrapperFiller: {
		flex: 1,
	},
	contact: {
		color: 'rgba(255,255,255,1)',
		fontSize: 35,
		textAlign: 'center',
	},
	rect7: {
		height: 8,
		backgroundColor: 'rgba(243,243,243,1)',
		width: 97,
	},
	titleWrapper: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		top: 40
	},
	button3: {
		width: 221,
		height: 17,
		position: 'absolute',
		bottom: 0,
		left: 33,
	},
	stackFiller: {
		flex: 1,
	},
	footerTexts1: {
		left: 0,
		height: 14,
		bottom: 20,
	},
	button4Filler: {
		flex: 1,
	},
	button4: {
		height: 14,
		alignSelf: 'center',
	},
	createAccount2Filler: {
		flex: 1,
	},
	createAccount2: {
		color: 'rgba(255,255,255,0.5)',
		textAlign: 'center',
	},
	button3Stack: {
		height: 17,
	},
	backgroundStack: {
		flex: 1,
	},
	container: {flex: 1},
	backButton: {
		width: 25,
		height: 25,
		marginLeft: 20,
		marginTop: 15,
	},
	backIcon: {
		color: 'rgba(250,250,250,1)',
		fontSize: 25,
	}
})
