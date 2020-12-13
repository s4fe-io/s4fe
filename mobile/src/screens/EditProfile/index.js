import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Alert,
	ActivityIndicator,
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import styles from './styles'

export default class Index extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			firstName: null,
			lastName: null,
			phoneNumber: null,
			dataLoading: false,
		}
	}

	componentDidMount() {}

	handleInput = (model, value) => {
		this.setState({[model]: value})
	}

	update(serial) {
		const { firstName, lastName, phoneNumber } = this.state
		const formData = {
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
		}
		Axios.patch(API.UPDATE_USER, formData).then(
			async res => {
				console.log('patched', res)
				await AsyncStorage.setItem('userData', JSON.stringify(res.data))

				this.props.navigation.navigate('UserProfile')
			},
			err => {
				console.log('err', err.response)
				const data = err.response.data
				console.log('parsed data', data)
				if (data.phone_number) {
					Alert.alert('Warning!', 'Phone: ' + data.phone_number[0])
				}
			},
		)
	}

	render() {
		const {navigation} = this.props
		const {firstName, lastName, phoneNumber, dataLoading} = this.state
		const currentUser = navigation.getParam('currentUser')
		if (firstName === null) {
			this.setState({
				firstName: currentUser.first_name,
				lastName: currentUser.last_name,
				phoneNumber: currentUser.phone_number.replace('+', '')
			})
		}
		console.log('user', firstName)
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
						<View
							style={{
								paddingTop: 10,
								paddingLeft: 20,
							}}>
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
								<View>
									<Text style={styles.addNewItem}>Edit Profile</Text>

									<ScrollView style={styles.scrollView}>
										<KeyboardAwareScrollView
											contentContainerStyle={{flexGrow: 1}}>
											<View style={styles.form}>
												{/* User ID */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="person"
														style={styles.icon8}
													/>
													<TextInput
														placeholder="First name"
														value={firstName}
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value => {
															this.handleInput('firstName', value)
														}

														}
													/>
												</View>

												{/* Last name */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="person"
														style={styles.icon8}
													/>
													<TextInput
														placeholder="Last name"
														value={lastName}
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('lastName', value)
														}
													/>
												</View>

												{/* Phone number */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="person"
														style={styles.icon8}
													/>
													<TextInput
														placeholder="Phone number"
														// value={phoneNumber.replace('+', '')}
														value={phoneNumber}
														placeholderTextColor="rgba(255,255,255,1)"
														keyboardType='number-pad'
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('phoneNumber', value)
														}
													/>
												</View>

												<View style={styles.groupFiller}>
													{dataLoading ? (
														<ActivityIndicator color="#fff" size="large" />
													) : (
														<TouchableOpacity
															onPress={() => this.update()}
															style={styles.button}>
															<Text style={styles.next}>Save</Text>
														</TouchableOpacity>
													)}
												</View>
											</View>
										</KeyboardAwareScrollView>
									</ScrollView>
								</View>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		)
	}
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 14,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'white',
	},
	inputAndroid: {
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
		marginTop: 10,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 18,
		borderWidth: 0.5,
		borderRadius: 8,
		paddingRight: 30,
	},
	placeholder: {
		color: 'white',
		fontWeight: 'bold',
	},
})
