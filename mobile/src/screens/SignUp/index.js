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
	Alert,
} from 'react-native'
import {Center} from '@builderx/utils'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import Colors from '../../constants/Colors'
import ValidationComponent from 'react-native-form-validator'
import RNPickerSelect from 'react-native-picker-select'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'

const countryTelData = require('country-telephone-data')

export default class PhoneNumber extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			phoneNumber: null,
			dataLoading: false,
			countriesList: [],
			selectedCountryCode: '',
			selectedCountryLabel: null,
		}

		this.picker = React.createRef() // make the ref
	}

	componentDidMount() {
		this.renderCountries()
	}

	renderCountries() {
		const countries = countryTelData.allCountries
		let result = []
		countries.forEach(country => {
			result.push({
				value: country.dialCode,
				label: `${country.name} +${country.dialCode}`,
				// name: country.name
			})
		})
		this.setState({countriesList: result})
	}

	// Handle selection of the Country
	handleCountrySelect = value => {
		this.setState({
			selectedCountryCode: value,
		})
	}

	// Phone verification
	verifyPhone(countryCode, phoneNumber) {
		const isValid = this.validate({
			phoneNumber: {numbers: true, required: true},
			selectedCountryCode: {required: true},
		})
		if (isValid) {
			this.setState({dataLoading: true})
			const formData = {
				phone_number: this.state.selectedCountryCode + this.state.phoneNumber,
			}
			Axios.post(`${API.GET_OTP}`, formData)
				.then(res => {
					console.log(res)
					this.setState({dataLoading: false})
					this.props.navigation.navigate('EnterPin', {
						phoneNumber: countryCode + phoneNumber,
					})
				})
				.catch(err => {
					console.log(err.response)
					this.setState({dataLoading: false})
					let tryAgain = null
					if (err.response) {
						tryAgain = err.response.data.error
					}
					Alert.alert('Warning!', tryAgain)
				})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}

	render() {
		const {navigation} = this.props
		const placeholder = {
			label: 'Select a country...',
			value: null,
		}

		const countryCode = this.state.selectedCountryCode
		const phoneNumber = this.state.phoneNumber

		return (
			<Fragment>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				<SafeAreaView style={styles.container}>
					<View style={styles.root}>
						<StatusBar
							barStyle="light-content"
							backgroundColor={Colors.PRIMARY}
						/>

						<View style={styles.backgroundStack}>
							<Center horizontal>
								<View style={styles.background}>
									<ImageBackground
										style={styles.rect}
										imageStyle={styles.rect_imageStyle}
										source={require('../../assets/images/Gradient_EsLX0zX.png')}
									/>
								</View>
							</Center>
							<View style={styles.startUsingS4FeColumn}>
								<Text style={styles.startUsingS4Fe}>
									Protect your items using S4FE
								</Text>
								<View style={styles.rect7} />
							</View>
							<View style={styles.form}>
								<View style={styles.username1Column}>
									<View style={styles.username1}>
										{/*<FontAwesomeIcon name="flag" style={styles.icon23} />*/}
										<RNPickerSelect
											placeholder={placeholder}
											placeholderTextColor="white"
											style={{
												...pickerSelectStyles,
												iconContainer: {
													right: 1,
												},
												placeholder: {
													color: 'white',
													marginRight: 11,
													marginLeft: 11,
													marginTop: 6,
													fontSize: 16,
													paddingHorizontal: 10,
													paddingVertical: 16,
												},
											}}
											Icon={() => {
												return <FontAwesomeIcon name="chevron-down" style={{
													marginRight: 10,
													color: 'white',
													fontSize: 16,
													marginTop: 20
												}} />
											}}
											onValueChange={this.handleCountrySelect}
											items={this.state.countriesList}
										/>
									</View>
									<View style={styles.username}>
										<FontAwesomeIcon name="phone" style={styles.icon22} />
										<TextInput
											placeholder="Enter your phone number"
											placeholderTextColor="rgba(255,255,255,1)"
											keyboardType="numeric"
											secureTextEntry={false}
											style={styles.usernameInput}
											onChangeText={value =>
												this.setState({phoneNumber: value})
											}
										/>
									</View>
								</View>
								<View style={styles.username1ColumnFiller} />
								<TouchableOpacity
									disabled={this.dataLoading}
									onPress={() => this.verifyPhone(countryCode, phoneNumber)}
									style={styles.button}>
									<Text style={styles.text2}>START</Text>
								</TouchableOpacity>

								<View style={{flex: 1, marginTop: 10}}>
									<TouchableOpacity
										onPress={() => navigation.navigate('LogIn')}
										style={styles.button4}>
										<View style={styles.createAccount2Filler} />
										<Text style={styles.createAccount2}>
											Already have an account? Sign In
										</Text>
									</TouchableOpacity>
								</View>
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		color: 'white',
		marginRight: 11,
		marginLeft: 11,
		marginTop: 10,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 18,
		borderWidth: 0,
		borderRadius: 8,
		paddingRight: 30
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
		paddingRight: 30
	},
	placeholder: {
		color: 'white',
		fontWeight: 'bold',
	},
})

// export default PhoneNumber
