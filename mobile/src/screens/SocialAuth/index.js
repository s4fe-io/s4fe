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
import styles from './styles'
import Colors from '../../constants/Colors'
import ValidationComponent from 'react-native-form-validator'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import { LoginButton } from 'react-native-fbsdk';

export default class PhoneNumber extends ValidationComponent {
	constructor(props) {
		super(props)
		this.state = {

		}
	}


	render() {
		const {navigation} = this.props
		return (
			<Fragment>
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
									Connect using your Social Network Account
								</Text>
								<View style={styles.rect7} />
							</View>
							<View style={styles.form}>
								<View style={styles.username1ColumnFiller} />
								<TouchableOpacity
									disabled={this.dataLoading}
									onPress={() => this.verifyPhone(countryCode, phoneNumber)}
									style={styles.button}>
									<Text style={styles.text2}>FACEBOOK</Text>
								</TouchableOpacity>

								<TouchableOpacity
									disabled={this.dataLoading}
									onPress={() => this.verifyPhone(countryCode, phoneNumber)}
									style={[styles.button, {marginTop: 10}]}>
									<Text style={styles.text2}>GOOGLE</Text>
								</TouchableOpacity>

							</View>

							<View style={styles.footerTexts}>
								<View style={{flex: 1, marginTop: 0}}>
									<TouchableOpacity
										onPress={() => navigation.navigate('PhoneNumber')}
										style={styles.button4}>
										<View style={styles.createAccount2Filler} />
										<Text style={styles.createAccount2}>
											Classic Login
										</Text>
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
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
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
