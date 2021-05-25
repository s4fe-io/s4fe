import React, { useState, useCallback, useEffect } from 'react'
import { Alert } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {Axios} from '../utils/axios'
import BackgroundTimer from 'react-native-background-timer'
import AsyncStorage from "@react-native-community/async-storage";
import {API} from "../utils/api";

function Chat(props) {
	const [messages, setMessages] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);

	useEffect(() => {
		BackgroundTimer.runBackgroundTimer(() => {
				fetchMessages()
			},1000);

		parseCurrentUser()
		return () => {
			BackgroundTimer.stopBackgroundTimer()
		}
	}, [])

	const parseCurrentUser = async () => {
		const user = await props.currentUser
		setCurrentUser(user)
	}

	const fetchMessages = () => {
		const params = {
			user_id: props.user.user_id
		}
		Axios.get(API.MESSAGES_WITHIN_TOPIC, {params}).then(res => {
			const result = res.data
			const parsedMessages = result.map((message, index) => {
				return {
					_id: index,
					text: message.message,
					user: {
						_id: message.user_id,
						name: message.user,
					},
				}
			})
			setMessages(parsedMessages)
		})
	}

	const sendMessage = (message) => {
		const formData = {
			content: message[0].text,
			receiver: props.user.user_id
		}
		return Axios.post(API.MESSAGES, formData)
	}

	const onSend = useCallback((messages = []) => {
		sendMessage(messages).then(res => {
			setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		}, err => {
			console.log(err.response)
			Alert.alert('Warning', JSON.parse(err.response))
		})
	}, [])

	return (
		<GiftedChat
			showUserAvatar={false}
			renderUsernameOnMessage={true}
			alwaysShowSend={true}
			messages={messages}
			onSend={messages => onSend(messages)}
			user={{
				_id: currentUser.id,
				name: currentUser.first_name,
				// avatar: currentUser.user_picture
			}}
		/>
	)
}

export default Chat
