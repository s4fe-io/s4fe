import React, {Component} from 'react'
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';

async function logOut(props) {
	console.log('logout')
	await AsyncStorage.removeItem('tokenData')
	props.navigation.navigate('LogIn')
}

function HeaderX(props) {
	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.group}>
				<View style={styles.iconRow}>
					<View style={styles.containerx}>
						<TouchableOpacity
							onPress={() => props.navigation.pop()}
							style={styles.button}>
							<FeatherIcon
								name={'chevron-left'}
								style={styles.icon2}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.containerx}>
					{props.user ?
						<Text style={styles.title}>
							{props.user.user}
						</Text> : null }
				</View>
				<TouchableOpacity
					onPress={() => logOut(props)}
					style={styles.button}>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	logo: {
		width: 100,
	},
	containerx: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		height: 40,
		backgroundColor: 'rgba(235,167,33,1)',
	},
	group: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	icon: {
		color: 'rgba(255,255,255,1)',
		fontSize: 25,
		width: 18,
		height: 25,
		marginTop: 40,
	},
	image: {
		width: 102,
		height: 102,

	},
	iconRow: {
		marginLeft: 10,
	},
	iconRowFiller: {
	},
	button: {
		width: 25,
		height: 25,
		marginRight: 10,
		marginTop: 15,
	},
	icon2: {
		color: 'rgba(250,250,250,1)',
		fontSize: 25,
	},
	title: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		marginTop: 15
	}
})

export default HeaderX
