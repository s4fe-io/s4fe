import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity
} from 'react-native'
import Colors from '../../constants/Colors'
import {Icon, Toast} from 'native-base'
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

import styles from './styles'

export default class Index extends Component {
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

	copyToClipboard = (value) => {
		Clipboard.setString(value);
		Toast.show({
			text: 'ID Copied.',
			type: 'success'
		})
	}

	render() {
		const {navigation} = this.props
		const currentUser = navigation.getParam('currentUser')

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
									<Text style={styles.addNewItem}>QR Code</Text>

									<ScrollView style={styles.scrollView}>
										<TouchableOpacity onPress={() => this.copyToClipboard(currentUser.unique_identifier)}>
											<Text style={styles.uniqueID}>{currentUser.unique_identifier}</Text>

										</TouchableOpacity>

										<View style={styles.qrWrapper}>
											<QRCode
												size={180}
												value={currentUser.unique_identifier}
											/>
										</View>
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
