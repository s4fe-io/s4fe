import React, {Component, Fragment} from 'react'
import {
	View,
	StatusBar,
	Text,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	ImageBackground,
	RefreshControl,
	Platform
} from 'react-native'

import {
	Container,
	ListItem,
	Body,
	Right,
	Icon,
	Fab,
	Button, Toast,
} from 'native-base'

import Header from '../../components/Header'
import styles from './styles'
import {Dimensions} from 'react-native'
import Colors from '../../constants/Colors'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import axios from 'axios'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from '@react-native-community/async-storage'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const cx = width * 1.5
const cy = height * 0.7
const rx = width * 2.6
const ry = height * 1.2

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			refreshing: false,
			userData: {
				first_name: null,
				last_name: null
			},
			items: [],
			active: false,
			reason: ''
		}
	}

	componentDidMount() {
		this.initializePushNotifications()
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.getUserData()
			this.fetchItems()
		})
		this.getUserData()
		this.fetchItems()
	}

	// Convert iOS fcm to google Reg token
	convertAPNToken (token) {
		const config = {
			headers: {
				Authorization: 'key=AAAAoJP5ry8:APA91bFGLFmvwfCuh0rAFaBJxG92505cx1_lMCoDFcHtlPDbkKtZzNpVs8F9JP-p4y9rYxyg6PIWP7PedXwG05lvpR7HUnkHNwe0QDXXQ7dw-7R7acMimLRlTl_NhXPiiHfW7NL-Ygd7'
			}
		};
		const formData = {
			application: "com.s4fe.S4FE",
			sandbox: true,
			apns_tokens: [token.token]
		}
		return axios.post('https://iid.googleapis.com/iid/v1:batchImport', formData, config)
	}

	// Send Registration ID to API
	async addFcm (registration_id, type) {
		try {
			const res = await Axios.post('api/v1/devices/', {registration_id, type});
			if (res.data.error) {
				return false;
			} else {
				return res;
			}
		} catch (e) {
			console.log(e);
			console.log(e.response);
		}
	};

	onClose(id, reason) {
		if (reason === 'user') {
			this.props.navigation.navigate('Chat', {
				item: {
					user_id: id
				}
			})
		}
		this.setState({ reason })

	}

	initializePushNotifications () {
		const {navigation} = this.props
		// Must be outside of any component LifeCycle (such as `componentDidMount`).

		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: async (token) => {
				let registrationToken = token.token
				if (Platform.OS === 'ios') {
					const {data} = await this.convertAPNToken(token)
					 registrationToken = data.results[0].registration_token
				}
				this.addFcm(registrationToken, token.os);
			},

			// (required) Called when a remote is received or opened, or local notification is opened
			onNotification: (notification) => {

				if (notification.foreground) {
					if (notification.data.item_id) {
						this.fetchItems()
						this.props.navigation.navigate('UserProfile')
					}
					Toast.show({
						text: notification.title,
						position: 'bottom',
						buttonText: !notification.data.item_id && 'Read',
						buttonTextStyle: {
							color: '#404040',
							fontWeight: '700'
						},
						textStyle: {
							color: '#404040',
						},
						style: {
							backgroundColor: '#e7e7e7',
							opacity: 0.8,
							borderRadius: Platform.OS === 'ios' ? 30 : 0,
						},
						// buttonTextStyle: { color: "#0b9bbf" },
						// buttonStyle: { backgroundColor: "#c39520" },
						duration: 3000,
						onClose: this.onClose.bind(this, notification.data.test)
					})
				} else {
					if (notification.data.test) {
						navigation.navigate('Chat', {
							item: {
								user_id: notification.data.test
							}
						})
					}
				}

				// process the notification
				// (required) Called when a remote is received or opened, or local notification is opened
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},

			// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
			onAction: function (notification) {
				console.log("ACTION:", notification.action);
				console.log("NOTIFICATION:", notification);
				// process the action
			},

			// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
			onRegistrationError: function(err) {
				console.error(err.message, err);
			},

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 * - if you are not using remote notification or do not have Firebase installed, use this:
			 *     requestPermissions: Platform.OS === 'ios'
			 */
			requestPermissions: true,
		});
	}


	componentWillUnmount() {
		this.focusListener.remove()
	}

	getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem('userData')
			console.log('value iz LS', value)
			if (value !== null) {

				// value previously stored
				this.setState({userData: JSON.parse(value)})
			}
		} catch (e) {
			// error reading value
		}
	}

	goToScreen(screen, payload) {
		this.props.navigation.navigate(screen, payload)
	}
	fetchItems() {
		this.setState({dataLoading: true})
		Axios.get(API.ITEMS)
			.then(res => {
				this.setState({items: res.data, dataLoading: false})
			})
			.catch(e => {
				console.log(e)
				this.setState({dataLoading: false})
			})
	}

	refresh () {
		return (
			<RefreshControl
				colors={["#9Bd35A", "#689F38"]}
				refreshing={this.props.dataLoading}
				onRefresh={this.fetchItems.bind(this)} />
		)
	}

	_renderItems = ({item}) => {
			return (
				<View style={styles.item}>
					<ListItem>
						<Body>
							<Text style={styles.defaultText}>{item.title}</Text>
							<Text note style={styles.note}>
								{item.status === 'A' ? 'Status: Active' : ''}
								{item.status === 'L' ? 'Status: Lost' : ''}
								{item.status === 'S' ? 'Status: Stolen' : ''}
							</Text>
						</Body>
						<Right>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								<TouchableOpacity
									style={{marginRight: 10}}
									onPress={() =>
										this.goToScreen('EditItem', {item})
									}>
									<Icon
										type="MaterialIcons"
										name="create"
										style={{color: Colors.DEFAULT, fontSize: 23}}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										this.goToScreen('TransferItem', {item})
									}>
									<Icon
										type="MaterialIcons"
										name="send"
										style={{color: Colors.DEFAULT, fontSize: 21}}
									/>
								</TouchableOpacity>
							</View>
						</Right>
					</ListItem>
				</View>
			)
	}

	onRefresh () {
		this.fetchItems()
	}

	render() {
		const {navigation} = this.props
		const {items, userData} = this.state
		// const loggedUserData = navigation.getParam('userData')
		// if (userData.first_name === null) {
		// 	this.setState({userData: loggedUserData})
		// }

		return (
			<View style={styles.root}>

				<View style={styles.background}>
					<ImageBackground
						style={styles.rect}
						imageStyle={styles.rect_imageStyle}
						source={require('../../assets/images/Gradient_EsLX0zX.png')}
					/>
				</View>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				<Header
					navigation={navigation}
					icon2Name="power"
					style={styles.headerX}
					currentUser={userData}
				/>

				<View style={styles.container} >

					{/*	 ITEMS */}
					<FlatList
						refreshControl={<RefreshControl
							colors={["#EBA721", "#ffffff"]}
							refreshing={this.state.dataLoading}
							onRefresh={() => {
								this.onRefresh()
							}} />}
						showsVerticalScrollIndicator={false}
						ListHeaderComponent={(
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('EditUserProfile', {
										currentUser: userData,
									})
								}>
								<View style={styles.userNameColumn}>
									<Text style={styles.userName}>
										{`${userData.first_name} ${userData.last_name}`}
									</Text>
									<Text style={styles.userEmail}>{userData.email}</Text>
								</View>
								<View style={styles.borderBottom} />
							</TouchableOpacity>
						)}
						data={items}
						renderItem={this._renderItems}
						keyExtractor={item => item.id}
					 />

					{/*<List style={{padding: 10}}>{this._renderItems()}</List>*/}
				</View>
				<Fab
					active={this.state.active}
					direction="up"
					containerStyle={{marginBottom: 10}}
					style={styles.fab}
					position="bottomRight"
					onPress={() => this.setState({active: !this.state.active})}>
					<Icon type="MaterialIcons" name="add" />
					<Button
						style={{backgroundColor: Colors.PRIMARY}}
						onPress={() => navigation.navigate('ScanNFC')}>
						<Icon type="MaterialIcons" name="add" />
					</Button>
					<Button
						style={{backgroundColor: Colors.PRIMARY}}
						onPress={() => navigation.navigate('ScanNFCTag')}>
						<Icon type="MaterialIcons" name="search" />
					</Button>
				</Fab>
			</View>
		)
	}
}
