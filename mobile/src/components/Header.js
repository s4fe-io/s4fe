import React, {Component} from 'react'
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import {Icon} from 'native-base'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';

async function logOut(props) {
	await AsyncStorage.removeItem('tokenData')
	await AsyncStorage.removeItem('userData')
	props.navigation.navigate('LogIn')
}

function HeaderX(props) {
	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.group}>
				<View style={styles.iconRow}>
					<View style={styles.containerx}>
						<Image
							source={require('../assets/images/S4FE_Logo_White.png')}
							resizeMode="contain"
							style={styles.logo}
						/>
					</View>
				</View>
				<View style={styles.iconRowFiller} />
				<TouchableOpacity
					onPress={() => props.navigation.navigate('QRCode', {currentUser: props.currentUser})}
					style={styles.button}>
					<Icon
						type={'FontAwesome'}
						name={'qrcode'}
						style={styles.icon2}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Topics')}
					style={styles.button}>
					<FeatherIcon
						name={'message-square'}
						style={styles.icon2}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => logOut(props)}
					style={styles.button}>
					<FeatherIcon
						name={props.icon2Name || 'settings'}
						style={styles.icon2}
					/>
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
		height: 100,
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: -25,
	},
	iconRowFiller: {
		flex: 1,
		flexDirection: 'row',
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
})

export default HeaderX
