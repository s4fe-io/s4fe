import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView, Platform,
	Alert
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import NfcManager, {Ndef, NdefParser, NfcTech} from 'react-native-nfc-manager'

import NfcProxy from "../../utils/NFCProxy";

const hash = require('object-hash')
const generateNFCKey = () => {
	const generatedHash = hash(Math.round(Math.random() * 10000000000))
	console.log('generated hash', generatedHash)
	return generatedHash
}

function buildTextPayload(valueToWrite) {
	return Ndef.encodeMessage([
		Ndef.textRecord(valueToWrite),
	]);
}

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
			showNFCAnimation: false
		}
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.setState({showNFCAnimation: false})
		})
	}

	componentWillUnmount() {
		this.focusListener.remove()
		this._cleanUp();
	}

	_cleanUp = () => {
		NfcManager.cancelTechnologyRequest().catch(() => 0);
	}

	// writeNFC = async () => {
	// 	try {
	// 		const NFCKey = generateNFCKey()
	// 		let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
	// 			alertMessage: 'Place your phone close to the S4FE sticker.'
	// 		});
	// 		console.log(resp);
	// 		let ndef = await NfcManager.getNdefMessage();
	// 		console.log(ndef);
	// 		let bytes = buildTextPayload(NFCKey);
	// 		await NfcManager.writeNdefMessage(bytes);
	// 		console.log('successfully write ndef');
	// 		await NfcManager.setAlertMessageIOS('Unique ID is written to the Tag');
	// 		this._cleanUp();
	// 		this.goToScreen(NFCKey)
	// 	} catch (ex) {
	// 		this._cleanUp();
	// 		console.log('ex', ex);
	// 		if (ex !== 'cancelled') {
	// 			if (ex !== 'NFCError:200') {
	// 				Alert.alert('Warning!', 'The tag is not empty! Please use the new (empty) S4FE tag.')
	// 			}
	// 		}
	// 	}
	// }

	goToScreen(nfcKey) {
		this.props.navigation.navigate('AddItem', {
			nfcKey,
		})
	}

	async writeNdef () {
		if (Platform.OS === 'android') {
			this.setState({showNFCAnimation: true})
		}
		const NFCKey = generateNFCKey()

		const scanTagResult = await NfcProxy.writeNdef({type: 'TEXT', value: NFCKey});
		console.log('scan tag result', scanTagResult)
		if (scanTagResult) {
			if (Platform.OS === 'android') {
				this.setState({showNFCAnimation: false})
			}
			this.goToScreen(NFCKey)
		}
	};



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
									<View style={styles.icon10Column}>
										<Text style={styles.scanS4FeTarcker}>
											ADD NEW ITEM {this.state.showNFCAnimation}
										</Text>
										{ Platform.OS === 'android' && this.state.showNFCAnimation ?
											<View style={styles.animation}>

												<LottieView
													source={require('../../assets/animations/nfc-animation.json')}
													autoPlay
													loop
												/>
											</View>  : null }

										<Text style={[styles.text, {marginTop: 0}]}>
											Add your item with S4FE NFC Tag or without?
										</Text>

										<TouchableOpacity
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												borderWidth: 1,
												borderColor: 'white',
												margin: 20,
												borderRadius: 5
											}}
											onPress={() => this.writeNdef()}>
											<MaterialIconsIcon name={'nfc'} style={{color: 'white', fontSize: 25, marginTop: 20, marginRight: -17}} />
											<Text style={styles.text}>
												With S4FE Tag
											</Text>
										</TouchableOpacity>

										{/*	Skip scanning */}
										<TouchableOpacity
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												borderWidth: 1,
												borderColor: 'white',
												margin: 20,
												borderRadius: 5
											}}
											onPress={() => this.goToScreen('none')}>
											<MaterialIconsIcon name={'description'} style={{color: 'white', fontSize: 25, marginTop: 20, marginRight: -17}} />
											<Text style={styles.text}>
												Without S4FE Tag
											</Text>
										</TouchableOpacity>
										{/*<TouchableOpacity onPress={() => this.goToScreen('none')}>*/}
										{/*	<Text style={styles.skipText}>Add without NFC</Text>*/}
										{/*</TouchableOpacity>*/}
									</View>
								</ImageBackground>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		)
	}

	// _writeToNFCTag = NFCKey => {
	// 	const cleanUp = () => {
	// 		this.setState({isTestRunning: false})
	// 		NfcManager.cancelTechnologyRequest().catch(() => 0)
	// 		// NfcManager.unregisterTagEvent()
	// 	}
	//
	// 	const parseText = tag => {
	// 		if (tag.ndefMessage) {
	// 			return NdefParser.parseText(tag.ndefMessage[0])
	// 		}
	// 		return null
	// 	}
	//
	// 	this.setState({isTestRunning: true})
	// 	NfcManager.registerTagEvent(tag => console.log(tag))
	// 		.then(() => NfcManager.requestTechnology(NfcTech.Ndef))
	// 		.then(() => NfcManager.getTag())
	// 		.then(tag => {
	// 			console.log(tag)
	// 		})
	// 		.then(() => NfcManager.getNdefMessage())
	// 		.then(tag => {
	// 			let parsedText = parseText(tag)
	// 			this.setState({tag, parsedText})
	// 		})
	// 		.then(() => NfcManager.writeNdefMessage(buildTextPayload(NFCKey)))
	// 		.then(() => {
	// 			console.log('Tag se upisao, ovo je hash: ', NFCKey)
	// 			this.goToScreen(NFCKey)
	// 			cleanUp()
	// 		})
	// 		.catch(err => {
	// 			console.warn(err)
	// 			cleanUp()
	// 		})
	// }
	//
	// _cancelTest = () => {
	// 	NfcManager.cancelTechnologyRequest().catch(err => console.warn(err))
	// }
	//
	// _startNfc = () => {
	// 	NfcManager.start()
	// 		.then(() => NfcManager.isEnabled())
	// 		.then(enabled => {
	// 			if (enabled) {
	// 				this._writeToNFCTag(generateNFCKey())
	// 			}
	// 			this.setState({enabled})
	// 		})
	// 		.catch(err => {
	// 			console.warn(err)
	// 			this.setState({enabled: false})
	// 		})
	// }
	//
	// _clearMessages = () => {
	// 	this.setState({tag: null, parsedText: null})
	// }
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
		marginTop: 30,
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
		marginTop: 0,
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
		padding: 20,
		fontSize: 20,
		textAlign: 'center',
	},
	skipText: {
		color: '#e9e9e9',
		marginTop: 10,
		fontSize: 18,
		textAlign: 'center',
	},
})

