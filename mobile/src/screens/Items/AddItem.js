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
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import RNPickerSelect from 'react-native-picker-select'
import CategoryButton from '../Category/CategoryButton'

const hash = require('object-hash')

export default class AddItem extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			categories: [],
			selectedCategory: null,
			dataLoading: false,
			userId: '',
			serial: null
		}
		this.state.userId = this.props.navigation.getParam('userId')
	}

	handleInput = (model, value) => {
		this.setState({[model]: value})
	}

	async saveItem(NFCKey) {
		const isValid = this.validate({
			title: {required: true},
			selectedCategory: {required: true},
		})
		if (this.state.selectedCategory === null){
			Alert.alert('Warning', 'The field "Category" is mandatory')
			return;
		}
		if (isValid) {
			this.setState({dataLoading: true})
			const formData = {
				title: this.state.title,
				category: this.state.selectedCategory.id,
				serial: this.state.serial,
				desc: this.state.description,
				key: NFCKey
			}
			Axios.post(API.ITEMS, formData)
				.then(() => {
					this.setState({dataLoading: false})
					this.props.navigation.navigate('UserProfile')
				})
				.catch(e => {
					this.setState({dataLoading: false})
					console.log(e)
					console.log(e.response.data)
					if (e.response.data) {
						const errors = {
							titleError: `Title: ${e.response.data.title[0]}`,
							categoryError: `Category: ${e.response.data.category[0]}`,
						}

						Alert.alert('Error!', JSON.stringify(errors))
					}
				})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}

	componentDidMount() {
		//this.fetchCategories()
	}

	render() {
		const {navigation} = this.props
		const NFCKey = navigation.getParam('nfcKey')
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
							<View style={styles.background}>
								<View>
									<Text style={styles.addNewItem}>ADD NEW ITEM</Text>

									<ScrollView style={styles.scrollView}>
										<KeyboardAwareScrollView
											contentContainerStyle={{flexGrow: 1}}>
											<View style={styles.form}>
												<CategoryButton onCategorySelected={(value) =>
														this.handleInput('selectedCategory', value)
													}
													navigation={this.props.navigation}
													selectedCategory={this.state.selectedCategory}
													redirectTo="AddItem"
												/>
												
												{/*Item title */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="devices"
														style={styles.icon8}
													/>
													<TextInput
														placeholder="Item title"
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('title', value)
														}
													/>
												</View>
												{/* Item Serial */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="description"
														style={styles.icon5}
													/>
													<TextInput
														placeholder="Serial number"
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('serial', value)
														}
													/>
												</View>
												{/* Item Description */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="description"
														style={styles.icon5}
													/>
													<TextInput
														placeholder="Item description"
														multiline={true}
														numberOfLines={4}
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('description', value)
														}
													/>
												</View>

												<View style={styles.groupFiller}>
													<TouchableOpacity
														onPress={() => this.saveItem(NFCKey)}
														style={styles.button}>
														<Text style={styles.next}>SAVE</Text>
													</TouchableOpacity>
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
		flex: 1
	},
	backgroundStack: {
		flex: 1,
	},
	rect2: {
		flex: 1,
	},
	rect2_imageStyle: {},
	icon10: {
		color: 'rgba(252,252,252,1)',
		fontSize: 30,
		height: 30,
		width: 30,
	},
	progressBar: {
		height: 40,
		flexDirection: 'row',
		marginLeft: 51,
		marginRight: 22,
	},
	icon2: {
		color: 'rgba(244,244,244,1)',
		fontSize: 38,
		width: 33,
		height: 40,
	},
	rect4: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 40,
		marginLeft: 9,
		marginTop: 16,
	},
	icon3: {
		color: 'rgba(255,255,255,1)',
		fontSize: 35,
		width: 40,
		height: 36,
		marginLeft: 7,
		marginTop: 4,
	},
	rect5: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(230, 230, 230,1)',
		opacity: 0.75,
		borderRadius: 40,
		marginLeft: 2,
		marginTop: 16,
	},
	icon2Row: {
		height: 40,
		flexDirection: 'row',
	},
	icon2RowFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon4: {
		color: 'rgba(255,255,255,1)',
		fontSize: 38,
		width: 34,
		height: 40,
		opacity: 0.75,
	},
	addNewItem: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		marginTop: 15,
		textAlign: 'center',
	},
	group2: {
		marginTop: 17,
	},
	email: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
	},
	icon6: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	emailInput: {
		height: 30,
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 17,
		marginLeft: 13,
		marginTop: 14,
	},
	name: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,0.25)',
		borderRadius: 5,
		width: 278,
		flexDirection: 'row',
		marginTop: 20,
		alignSelf: 'center',
	},
	icon5: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 16,
		alignSelf: 'center',
	},
	nameInput: {
		height: 30,
		color: 'rgba(255,255,255,1)',
		fontSize: 14,
		flex: 1,
		marginRight: 17,
		marginLeft: 12,
		marginTop: 14,
	},
	icon8: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	textInput: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
	},
	icon10Column: {},
	icon10ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(247,247,247,0)',
		borderColor: 'rgba(255,255,255,1)',
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center',
	},
	next: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center',
	},
	container: {flex: 1},
	form: {
		padding: 40,
	},
	group: {
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	selectPicker: {
		paddingBottom: 5,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		marginBottom: 10,
	},
	nextButton: {
		alignItems: 'center',
	},
	groupFiller: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 40,
	}
})
