import React, {Component, useState, useCallback, useEffect} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Platform, Dimensions, AsyncStorage,
} from 'react-native'
import ChatHeader from '../../components/ChatHeader'
import Colors from "../../constants/Colors";
import Chat from '../../components/Chat'

const parseCurrentUser = async () => {
	return JSON.parse(await AsyncStorage.getItem('userData'))
}

function ChatRender (props) {
	const navigation = props.navigation
	const params = props.navigation.getParam('item')
	const currentUser = parseCurrentUser()

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
				navigation={navigation}
				icon2Name="power"
				style={styles.headerX}
				user={params}
			/>

			<View style={styles.container}>
				<Chat user={params} currentUser={currentUser} />
			</View>
		</View>
	)
}

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	container: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: height * 0.03,
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
		height: 70,
		elevation: 15,
		shadowOffset: {
			height: 7,
			width: 1,
		},
		shadowColor: 'rgba(0,0,0,1)',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		marginTop: Platform.OS === 'android' ? 0 : 30,
	},
})

export default ChatRender
