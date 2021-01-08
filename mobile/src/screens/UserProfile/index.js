import React, {Component, Fragment} from 'react'
import {
	View,
	StatusBar,
	Text,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	AsyncStorage,
	ImageBackground,
} from 'react-native'

import {
	Container,
	ListItem,
	Body,
	Right,
	Icon,
	Fab,
	Button,
	Card,
	CardItem,
	Content,
	List,
	Left,
} from 'native-base'

import Header from '../../components/Header'
import Svg, {Ellipse} from 'react-native-svg'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import {Dimensions} from 'react-native'
import Colors from '../../constants/Colors'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'

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
			userData: {
				first_name: null,
				last_name: null
			},
			items: [],
			active: false,
		}
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			console.log('user profile focused')
			this.getUserData()
			this.fetchItems()
		})
		this.fetchItems()
	}

	componentWillUnmount() {
		this.focusListener.remove()
	}

	getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem('userData')
			if (value !== null) {
				console.log('value', value)

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
				console.log('items fetched', res.data)
				this.setState({items: res.data, dataLoading: false})
			})
			.catch(e => {
				console.log(e)
				this.setState({dataLoading: false})
			})
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

	render() {
		const {navigation} = this.props
		const {items, userData} = this.state
		const loggedUserData = navigation.getParam('userData')
		if (userData.first_name === null) {
			this.setState({userData: loggedUserData})
		}

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
				/>

				<View style={styles.container} >
					{/*	 ITEMS */}
					<FlatList
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
