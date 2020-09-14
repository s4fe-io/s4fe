import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	Text,
	TouchableOpacity,
	Image,
	SafeAreaView,
	ScrollView,
	FlatList,
	AsyncStorage,
} from 'react-native'

import {
	Button,
	Left,
	Switch,
	List,
	ListItem,
	Content,
	Card,
	CardItem,
	Body,
	Right,
	Icon,
} from 'native-base'

import Header from '../../components/Header'
import Svg, {Ellipse} from 'react-native-svg'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import {Dimensions} from 'react-native'
import Colors from '../../constants/Colors'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const cx = width * 2
const cy = height * 0.7
const rx = width * 2.6
const ry = height * 1.2

const DATA = [
	{
		id: 1,
		title: 'MacBook Pro',
	},
	{
		id: 2,
		title: 'Rolex President',
	},
	{
		id: 3,
		title: 'iPhone X',
	},
]

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: {},
			items: [],
		}
		// this.state.userData = this.props.navigation.getParam('userData')
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			console.log('user profile focused')
			this.getUserData()
			this.fetchItems()
		})
	}

	componentWillUnmount() {
		this.focusListener.remove()
	}

	getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem('userData')
			console.log('USER DATA', value)
			if (value !== null) {
				// value previously stored
				this.setState({userData: JSON.parse(value)})
				console.log('USER DATA', this.state.userData)
			}
		} catch (e) {
			// error reading value
		}
	}

	goToScreen() {
		this.props.navigation.navigate('AddItem', {
			userId: this.state.userData.id,
		})
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

	render() {
		const {navigation} = this.props
		const {items} = this.state
		const userData = navigation.getParam('userData')
		console.log('user ITEMS', items)
		console.log('user userData', userData)

		return (
			<View style={styles.root}>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				<Header icon2Name="power" style={styles.headerX} />
				<View style={styles.body}>
					<View style={styles.ellipseStack}>
						<Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
							<Ellipse
								strokeWidth={1}
								fill="rgba(249,249,249,1)"
								cx={cx}
								cy={cy}
								rx={rx}
								ry={ry}
							/>
						</Svg>
						<Fragment>
							<SafeAreaView style={styles.container}>
								<View style={styles.container}>
									<Text style={styles.account4}>ACCOUNT</Text>
									<View style={styles.userInfo}>
										<View style={styles.avatarRow}>
											<Image
												source={require('../../assets/images/actor-adult-black-and-white-1040880.jpg')}
												resizeMode="stretch"
												style={styles.avatar}
											/>
											<View style={styles.userNameColumn}>
												<Text style={styles.userName}>
													{`${userData.firstName} ${userData.lastName}`}
												</Text>
												<Text style={styles.userEmail}>{userData.email}</Text>
											</View>
										</View>
									</View>

									{/*	 ITEMS */}
									<SafeAreaView style={styles.containerScroll}>
										<FlatList
											data={items}
											renderItem={({item}) => (
												<Item
													title={item.title}
													item={item}
													navigation={navigation}
												/>
											)}
											keyExtractor={item => item.title}
										/>
									</SafeAreaView>
								</View>

								{/*<TouchableOpacity*/}
								{/*	onPress={() => props.navigation.navigate('Chat')}*/}
								{/*	style={styles.button}>*/}
								{/*	<Text style={styles.addItem}>Chat</Text>*/}
								{/*</TouchableOpacity>*/}
								<TouchableOpacity
									onPress={() => navigation.navigate('ScanNFC')}
									style={styles.button}>
									<Text style={styles.addItem}>Add Item</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigation.navigate('ScanNFCTag')}
									style={styles.button1}>
									<Text style={styles.addItem}>Scan TAG</Text>
								</TouchableOpacity>
							</SafeAreaView>
						</Fragment>
					</View>
				</View>
			</View>
		)
	}
}

function Item({title, navigation, item}) {
	return (
		<View style={styles.item}>
			<ListItem
				icon
				onPress={() =>
					navigation.navigate('EditItem', {
						item,
					})
				}>
				{/*<Left>*/}
				{/*	<Button style={{backgroundColor: '#cacaca'}}>*/}
				{/*		<Icon active name="wifi" />*/}
				{/*	</Button>*/}
				{/*</Left>*/}
				<Body>
					<Text>{title}</Text>
				</Body>
				<Right>
					<Icon active name="arrow-forward" />
				</Right>
			</ListItem>
		</View>
	)
}
