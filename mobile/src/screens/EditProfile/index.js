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
			searchedValue: '',
			item: null,
			dataLoading: false,
		}
	}

	componentDidMount() {}

	handleInput = (model, value) => {
		this.setState({[model]: value})
	}

	search(serial) {
		const params = {
			serial: serial,
		}
		Axios.get(API.SEARCH, {params}).then(
			res => {
				console.log('searched', res)
				this.setState({item: res.data})
				this.props.navigation.navigate('SearchItemDetails', {
					itemDetails: res.data,
				})
			},
			err => {
				console.log('err', err.response)
				Alert.alert('Warning', err.response.data.status || 'No Items')
			},
		)
	}

	render() {
		const {navigation} = this.props
		const {searchedValue, dataLoading} = this.state
		const currentUser = navigation.getParam('currentUser')
		console.log('user', currentUser)
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
														value={currentUser.first_name}
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('firstName', value)
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
														value={currentUser.last_name}
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
														value={currentUser.phone_number.replace('+', '')}
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
															onPress={() => this.search(searchedValue)}
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
