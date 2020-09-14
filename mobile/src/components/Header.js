import React, {Component} from 'react'
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

function HeaderX(props) {
	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.group}>

				<View style={styles.iconRow}>
					<MaterialIconsIcon name="dehaze" style={styles.icon} />
					<Image
						source={require('../assets/images/S4FE_Logo_White.png')}
						resizeMode="contain"
						style={styles.image}
					/>
				</View>
				{/*<View style={styles.iconRowFiller} />*/}
				{/*<TouchableOpacity*/}
				{/*	onPress={() => console.log('Navigate to Settings')}*/}
				{/*	style={styles.button}>*/}
				{/*	<FeatherIcon*/}
				{/*		name={props.icon2Name || 'settings'}*/}
				{/*		style={styles.icon2}*/}
				{/*	/>*/}
				{/*</TouchableOpacity>*/}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(235,167,33,1)',
	},
	group: {
		height: 55,
		backgroundColor: 'rgba(235,167,33,1)',
		width: 360,
		flexDirection: 'row',
		marginTop: 25,
		alignSelf: 'center',
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
		marginLeft: 101,
	},
	iconRow: {
		height: 102,
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
