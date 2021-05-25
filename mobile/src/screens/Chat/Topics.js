import React, {Component, Fragment} from 'react'
import {
	View,
	StatusBar,
	Text,
	FlatList,
	ImageBackground,
} from 'react-native'

import {
	ListItem,
	Body,
	Right,
	Icon,
	Fab,
	Button,
	Left
} from 'native-base'

import ChatHeader from '../../components/ChatHeader'
import styles from './styles'
import {Dimensions} from 'react-native'
import Colors from '../../constants/Colors'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import FeatherIcon from "react-native-vector-icons/Feather";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


export default class Topics extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

			topics: [],
			active: false,
		}
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.fetchTopics()
		})
		this.fetchTopics()
	}

	componentWillUnmount() {
		this.focusListener.remove()
	}

	goToScreen(screen, payload) {
		this.props.navigation.navigate(screen, payload)
	}

	fetchTopics() {
		this.setState({dataLoading: true})
		Axios.get(API.MESSAGES_BY_USER)
			.then(res => {
				this.setState({topics: res.data, dataLoading: false})
			})
			.catch(e => {
				console.log(e)
				this.setState({dataLoading: false})
			})
	}

	_renderItems = ({item}) => {
		return (
			<View style={styles.item}>
				<ListItem onPress={() => this.goToScreen('Chat', {item})}>
					<Left>
						<FeatherIcon
							name={'message-square'}
							style={styles.icon2}
						/>
						<Text style={[styles.defaultText, {marginLeft: 10}]}>{item.user}</Text>

					</Left>
					<Body>
					</Body>
					<Right>
						{item.unread !== 0 &&
							<View style={{backgroundColor: '#27ae60', padding: 8, borderRadius: 100}} />
						}

					</Right>
				</ListItem>
			</View>
		)
	}

	render() {
		const {navigation} = this.props
		const {topics} = this.state


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
				<ChatHeader
					user={false}
					navigation={navigation}
					icon2Name="power"
					style={styles.headerX}
				/>

				<View style={styles.container} >
					{/*	 ITEMS */}
					<FlatList
						showsVerticalScrollIndicator={false}

						data={topics}
						renderItem={this._renderItems}
						keyExtractor={item => item.id}
					/>
				</View>
			</View>
		)
	}
}
