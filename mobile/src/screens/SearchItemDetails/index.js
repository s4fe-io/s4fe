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
	ActivityIndicator
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import styles from './styles'


export default class SearchItemDetails extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {
			searchedValue: '',
			item: null,
			dataLoading: false
		}
	}

	componentDidMount() {
	}

	handleInput = (model, value) => {
		this.setState({[model]: value})
	}


	render() {
		const {navigation} = this.props
		const { searchedValue, dataLoading, item } = this.state
		const itemDetails = navigation.getParam('itemDetails')
		console.log('item details', itemDetails)

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
								<ImageBackground
									style={styles.rect2}
									imageStyle={styles.rect2_imageStyle}
									source={require('../../assets/images/Gradient_EsLX0zX.png')}>
									<View>
										<Text style={styles.addNewItem}>ITEM DETAILS</Text>

										<ScrollView style={styles.scrollView}>
											<KeyboardAwareScrollView
												contentContainerStyle={{flexGrow: 1}}>
												<View style={styles.form}>
													{/* User ID */}
													<View style={styles.group}>
																<Text style={styles.centerText}>{itemDetails.title}</Text>
																<Text style={styles.smallText}>Status: {itemDetails.status}</Text>
													</View>

													<View style={styles.groupFiller}>
														{ dataLoading ?
														<ActivityIndicator color="#fff" size="large"/> :
														<TouchableOpacity
															onPress={() => console.log('contact')}
															style={styles.button}>
															<Text style={styles.next}>Contact the owner</Text>
														</TouchableOpacity> }
													</View>
												</View>


											</KeyboardAwareScrollView>
										</ScrollView>
									</View>
								</ImageBackground>
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

