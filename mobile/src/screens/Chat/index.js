import React, {Component, useState, useCallback, useEffect} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Header from '../../components/Header'
import {API} from '../../utils/api'
import {Axios} from '../../utils/axios'
import {parse} from 'react-native-svg'

export function Messages() {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		Axios.get(API.MESSAGES).then(res => {
			const result = res.data
			const parsedMessages = result.map(message => {
				return {
					_id: message.id,
					text: message.content,
					name: 'John Doe',
				}
			})
			// Set messages
			setMessages(parsedMessages)
		})
		// setMessages([
		// 	{
		// 		_id: 1,
		// 		text: 'Hello developer',
		// 		createdAt: new Date(),
		// 		user: {
		// 			_id: 2,
		// 			name: 'React Native',
		// 			avatar: 'https://placeimg.com/140/140/any',
		// 		},
		// 	},
		// ])
	}, [])

	const onSend = useCallback((messages = []) => {
		console.log('messages', messages)
		const formData = {
			content: messages[0].text,
			receiver: 10
		}
		Axios.post(API.MESSAGES, formData).then(res => {
			console.log('response iz send message', res)
			// setMessages(previousMessages =>
			// 	GiftedChat.append(previousMessages, messages),
			// )
		})
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages),
		)

	}, [])

	return (
		<GiftedChat
			messages={messages}
			onSend={messages => onSend(messages)}
			user={{
				_id: 1,
			}}
		/>
	)
}

function Chat(props) {
	return (
		<View style={styles.root}>
			<StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
			<Header icon2Name="asdasdasd" style={styles.headerX} />
			<View style={styles.background}>{Messages()}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'rgb(255,255,255)',
	},
	background: {
		flex: 1,
		bottom: 60,
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
	chat: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		marginTop: 15,
		marginLeft: 142,
	},
	group2: {
		marginTop: 78,
	},
	email: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
	},
	icon6: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	emailInput: {
		height: 30,
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 17,
		marginLeft: 13,
		marginTop: 14,
	},
	name: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,0.25)',
		borderRadius: 5,
		width: 278,
		flexDirection: 'row',
		marginTop: 20,
		alignSelf: 'center',
	},
	icon5: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 16,
		alignSelf: 'center',
	},
	nameInput: {
		height: 30,
		color: 'rgba(255,255,255,1)',
		fontSize: 14,
		flex: 1,
		marginRight: 17,
		marginLeft: 12,
		marginTop: 14,
	},
	group: {
		height: 59,
		backgroundColor: 'rgba(255,255,255,0.25)',
		borderRadius: 5,
		width: 278,
		flexDirection: 'row',
		marginTop: 20,
	},
	icon8: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	textInput: {
		height: 30,
		color: 'rgba(255,255,255,1)',
		fontSize: 14,
		flex: 1,
		marginRight: 17,
		marginLeft: 13,
		marginTop: 14,
	},
	icon10Column: {
		width: 308,
		marginTop: 23,
		marginLeft: 11,
	},
	icon10ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 55,
		backgroundColor: 'rgba(247,247,247,0)',
		borderRadius: 5,
		borderColor: 'rgba(255,255,255,1)',
		borderWidth: 1,
		marginBottom: 256,
		marginLeft: 41,
		marginRight: 41,
	},
	save: {
		width: 35,
		color: 'rgba(255,255,255,1)',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 18,
		alignSelf: 'center',
	},
	headerX: {
		height: 80,
		elevation: 15,
		shadowOffset: {
			height: 7,
			width: 1,
		},
		shadowColor: 'rgba(0,0,0,1)',
		shadowOpacity: 0.1,
		shadowRadius: 5,
	},
})

export default Chat
