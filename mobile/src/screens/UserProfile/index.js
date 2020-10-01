import React, {Component, Fragment} from 'react'
import {
	View,
	StatusBar,
	Text,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	AsyncStorage,
} from 'react-native'

import {
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
	Left
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

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: {},
			items: [],
			active: false
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

	_renderItems () {
		const {items} = this.state
			return (
				items.map(item => {
					console.log(item)

					return (
						<View style={styles.item}>
							<ListItem onPress={() =>
								this.props.navigation.navigate('EditItem', {item})
							}>
								<Body>
									<Text style={{fonsSize: 20}}>{item.title}</Text>
									<Text note>{item.desc}</Text>
								</Body>
								<Right>
									<Icon name="arrow-forward" />
								</Right>
							</ListItem>
						</View>
					)
				})

			)
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
				<Header navigation={navigation} icon2Name="power" style={styles.headerX} />
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
							<Content>
								<View style={styles.container}>
									<View style={styles.userNameColumn}>
										<Text style={styles.userName}>
											{`${userData.first_name} ${userData.last_name}`}
										</Text>
										<Text style={styles.userEmail}>{userData.email}</Text>
									</View>

									{/*	 ITEMS */}
									<List style={{padding: 10}}>
										{this._renderItems()}
									</List>
								</View>

							</Content>
						</Fragment>
					</View>
				</View>
				<Fab
					active={this.state.active}
					direction="up"
					containerStyle={{marginBottom: 20}}
					style={{ backgroundColor: Colors.PRIMARY }}
					position="bottomRight"
					onPress={() => this.setState({ active: !this.state.active })}>
					<Icon name="add" />
					<Button style={{ backgroundColor: Colors.PRIMARY }} onPress={() => navigation.navigate('ScanNFC')}>
						<Icon name="add" />
					</Button>
					<Button style={{ backgroundColor: '#3B5998' }} onPress={() => navigation.navigate('ScanNFCTag')}>
						<Icon name="search" />
					</Button>
				</Fab>
			</View>
		)
	}
}


