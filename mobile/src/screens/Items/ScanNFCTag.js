import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	Platform
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import NfcManager, {NdefParser, NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'

const hash = require('object-hash')

export default class ScanNFC extends Component {
	constructor(props) {
		super(props)
		this.state = {
			supported: false,
			enabled: false,
			isTestRunning: false,
			text: 'hi, nfc!',
			parsedText: null,
			tag: null,
		}
	}

	componentDidMount() {
		this.initializeNFC()
		this.registerNFC()
	}

	componentWillUnmount() {
		NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
		NfcManager.unregisterTagEvent().catch(() => 0);
	}

	decodeNdefMessage = (tag) => {
		try {
			const decodedTag = Ndef.text.decodePayload(tag.ndefMessage[0].payload) || null
			this.fetchItemInfo(decodedTag)
		} catch (e) {
			console.log(e);
		}
		return null;
	}

	initializeNFC = () => {
		NfcManager.start();
		NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
			console.log('tag', tag);
			this.decodeNdefMessage(tag)

			// const nfcTag = await NfcManager.getTag()
			// console.log('ovo je nfc tag', nfcTag)
			NfcManager.setAlertMessageIOS('I got your tag!');
			NfcManager.unregisterTagEvent().catch((e) => console.log('err', e));
		});
	}

	registerNFC = async () => {
		try {
			console.log('register');
			await NfcManager.registerTagEvent();
		} catch (ex) {
			console.warn('ex', ex);
			NfcManager.unregisterTagEvent().catch((e) => console.log('err', e));
		}
	};

	_cleanUp = () => {
		NfcManager.cancelTechnologyRequest()
			.then(() => {
				console.log('cancel')
			})
			.catch(() => 0);
	}

	_clearMessages = () => {
		this.setState({tag: null, parsedText: null})
	}

	fetchItemInfo(NFCKey) {
		console.log('decoded tag iz fetch', NFCKey)
		const formData = {
			key: NFCKey,
		}
		Axios.post(API.ITEMS_STATUS, formData).then(
			res => {
				console.log('res', res)
				const result = res.data
				if (result.your_device) {
					NfcManager.cancelTechnologyRequest().catch(() => 0)
					this.registerNFC()
					Alert.alert('Info', 'This is your device.')
				} else if (result.status === 'L' || result.status === 'S') {
					Alert.alert(
						'Warning',
						'This device is reported stolen or lost. Contact the owner?',
						[
							{
								text: 'Cancel',
								onPress: () => {
									this.setState({
										isTestRunning: false,
										enabled: false,
									})
									NfcManager.cancelTechnologyRequest().catch(() => 0)
									this.registerNFC()
									console.log('Cancel Pressed')
								},
								style: 'cancel',
							},
							{
								text: 'Contact',
								onPress: () => this.goToScreen('ContactOwner', result),
							},
						],
						{cancelable: false},
					)
				} else {
					Alert.alert('Info', 'This tag is registered with another user')
					NfcManager.cancelTechnologyRequest().catch(() => 0)
					this.registerNFC()
				}
			},
			err => {
				console.log('err', err.response)
				const status = err.response.data.status
				console.log('data', status)
				if (status) {
					Alert.alert('Warning', status)
					// this.setState({
					// 	isTestRunning: false,
					// 	enabled: false,
					// })
					NfcManager.cancelTechnologyRequest().catch(() => 0)
					this.goToScreen('UserProfile')

				}
			},
		)
	}

	goToScreen(screen, payload) {
		console.log('payload', payload)
		this.props.navigation.navigate(screen, {payload})
	}

	render() {
		const {navigation} = this.props
		let {supported, enabled, tag, text, parsedText, isTestRunning} = this.state
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
						<View>
							<View>
									<View style={styles.icon10Column}>
										<Text style={styles.scanS4FeTarcker}>
											SCAN S4FE TRACKER
										</Text>
										{ Platform.OS === 'android' ?
											<View style={styles.animation}>

												<LottieView
													source={require('../../assets/animations/nfc-animation.json')}
													autoPlay
													loop
												/>
											</View>  : null }
										<Text style={[styles.text, {marginTop: 30}]}>
											Place your phone close to the S4FE sticker
										</Text>
									</View>

								<TouchableOpacity onPress={() => this.registerNFC()}>
									<Text style={styles.text}>
										Scan NFC
									</Text>
								</TouchableOpacity>

									<View style={{marginTop: 20}}>
										<TouchableOpacity onPress={() => this.goToScreen('SearchBySerial')}>
											<Text style={styles.text}>
												Search by serial number
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
		justifyContent: 'center',
	},
	rect: {
		flex: 1,
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
		marginLeft: 44,
		marginRight: 10,
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
		color: 'rgba(219,219,219,0.5)',
		fontSize: 35,
		width: 40,
		height: 36,
		marginLeft: 7,
		marginTop: 4,
	},
	rect5: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(219,219,219,1)',
		opacity: 0.5,
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
		color: 'rgba(219,219,219,0.5)',
		fontSize: 38,
		width: 34,
		height: 40,
		opacity: 0.75,
	},
	scanS4FeTarcker: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		marginTop: 36,
		textAlign: 'center',
	},
	image: {
		width: 200,
		height: 200,
		backgroundColor: 'rgba(237,237,237,1)',
		marginTop: 34,
		marginLeft: 69,
	},
	icon10Column: {
		marginTop: 23,
	},
	icon10ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(247,247,247,0)',
		borderRadius: 5,
		borderColor: 'rgba(255,255,255,1)',
		borderWidth: 1,
		marginLeft: 50,
		marginRight: 50,
	},
	cancel: {
		color: 'rgba(255,255,255,1)',
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 15,
	},
	container: {flex: 1},
	animation: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 30,
	},
})
