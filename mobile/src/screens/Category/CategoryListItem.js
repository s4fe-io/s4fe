import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo'

export const CategoryListItem = ({ item, onPress }) => {
	return (
		<TouchableOpacity onPress={() => onPress(item)}>
			<View style={[styles.categoryItem, styles.center]}>
				{
					item.img &&
					<Image
						style={styles.image}
						source={{
							uri: item.img,
						}}
					/>
				}
				<Text style={styles.textInput}>{item.title}</Text>

				{
					item.children && item.children.length > 0 &&
					<View style={styles.iconView}>
						<EntypoIcon name="chevron-thin-right" size={20} style={styles.icon} />
					</View>
				}
			</View>
		</TouchableOpacity>
	);
};


const styles = StyleSheet.create({
	categoryItem: {
		flex: 1,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		flexDirection: 'row',
		marginTop: 1,
		marginBottom: 1,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		color: 'white',
		height: 85
	},
	textInput: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginLeft: 11,
		//fontSize: 16
	},
	image: {
		width: 66,
		height: 58,
	},
	center: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconView: {
		justifyContent: 'center',
	},
	icon: {
		color: 'white',
		marginRight: 20
	}
});
