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
	AsyncStorage,
	Alert,
	ActivityIndicator
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import RNPickerSelect from 'react-native-picker-select'
import styles from './styles'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


export default class TransferItem extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			uniqueUserId: '',
			items: [],
			selectedItem: '',
			dataLoading: false
		}
		this.qrCodeRead = this.qrCodeRead.bind(this)
		this.state.userId = this.props.navigation.getParam('userId')
	}

	componentDidMount() {
		this.fetchItems()
	}

	fetchItems() {
		this.setState({dataLoading: true})
		Axios.get(API.ITEMS)
			.then(res => {
				console.log('items fetched', res.data)
				const result = []
				res.data.forEach(item => {
					result.push({
						value: item.id,
						label: item.title,
					})
				})
				this.setState({items: result, dataLoading: false})
			})
			.catch(e => {
				console.log(e)
				this.setState({dataLoading: false})
			})
	}


	handleCategoriesSelect = value => {
		this.setState({
			selectedItem: value,
		})
	}
	handleInput = (model, value) => {
		this.setState({[model]: value})
	}

	async transferItem() {
		const isValid = this.validate({
			uniqueUserId: {required: true},
			selectedCategory: {required: true},
		})
		if (isValid) {
			this.setState({dataLoading: true})
			const formData = {
				item: this.state.selectedItem,
				user: this.state.uniqueUserId
			}
			console.log('forma ', formData)
			Axios.post(API.ITEM_TRANSFER, formData)
				.then((res) => {
					console.log(res)
					this.setState({
						dataLoading: false,
						uniqueUserId: '',
						selectedItem: ''
					})
				})
				.catch(e => {
					this.setState({dataLoading: false})
					console.log(e)
					console.log(e.response.data)
					if (e.response.data) {
						Alert.alert('Error!', JSON.stringify(e.response.data.error))

					}
				})
		} else {
			Alert.alert('Warning', this.getErrorMessages())
		}
	}

	qrCodeRead ({data}) {
		console.log('qr code ', data)
		this.setState({uniqueUserId: data})
		setTimeout(() => {
			this.scanner.reactivate()
		}, 2000)
	}

	_renderCamera () {
		return (
			<View style={{marginTop: 80}}>
				<QRCodeScanner
					cameraTimeout={0}
					ref={(node) => { this.scanner = node }}
					cameraStyle={styles.qrContainer}
					customMarker={
							<View style={styles.marker}>
								<Text></Text>
							</View>
					}
					fadeIn={true}
					showMarker={true}
					onRead={this.qrCodeRead}
					bottomContent={
						<TouchableOpacity style={styles.buttonTouchable}>
							<Text style={styles.buttonText}>Scan a QR code</Text>
						</TouchableOpacity>
					}
				/>
			</View>
		)
	}
	render() {
		const {navigation} = this.props
		const placeholder = {
			label: 'Select item',
			value: null,
			color: '#cacaca',
		}
		const { uniqueUserId, dataLoading, selectedItem } = this.state

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
									<Text style={styles.addNewItem}>TRANSFER ITEM</Text>

									<ScrollView style={styles.scrollView}>
										<KeyboardAwareScrollView
											contentContainerStyle={{flexGrow: 1}}>
											{ this._renderCamera() }
											<View style={styles.form}>
												{/* User ID */}
												<View style={styles.group}>
													<MaterialIconsIcon
														name="person"
														style={styles.icon8}
													/>
													<TextInput
														placeholder="Unique User ID"
														value={uniqueUserId}
														placeholderTextColor="rgba(255,255,255,1)"
														secureTextEntry={false}
														style={styles.textInput}
														onChangeText={value =>
															this.handleInput('uniqueUserId', value)
														}
													/>
												</View>
												{/* Select item */}
												<View style={styles.selectPicker}>
													<RNPickerSelect
														value={selectedItem}
														placeholder={placeholder}
														placeholderTextColor="white"
														style={pickerSelectStyles}
														onValueChange={this.handleCategoriesSelect}
														items={this.state.items}
													/>
												</View>

												<View style={styles.groupFiller}>
													{ dataLoading ?
													<ActivityIndicator color="#fff" size="large"/> :
													<TouchableOpacity
														onPress={() => this.transferItem()}
														style={styles.button}>
														<Text style={styles.next}>TRANSFER</Text>
													</TouchableOpacity> }
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

