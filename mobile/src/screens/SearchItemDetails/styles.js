import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
export default StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'transparent',
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
	backgroundStack: {
		flex: 1,
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
	progressBar: {
		height: 40,
		flexDirection: 'row',
		marginLeft: 51,
		marginRight: 22,
	},
	icon2: {
		color: 'rgba(244,244,244,1)',
		fontSize: 38,
		width: 33,
		height: 40,
	},
	rect4: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 40,
		marginLeft: 9,
		marginTop: 16,
	},
	icon3: {
		color: 'rgba(255,255,255,1)',
		fontSize: 35,
		width: 40,
		height: 36,
		marginLeft: 7,
		marginTop: 4,
	},
	rect5: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(230, 230, 230,1)',
		opacity: 0.75,
		borderRadius: 40,
		marginLeft: 2,
		marginTop: 16,
	},
	icon2Row: {
		height: 40,
		flexDirection: 'row',
	},
	icon2RowFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon4: {
		color: 'rgba(255,255,255,1)',
		fontSize: 38,
		width: 34,
		height: 40,
		opacity: 0.75,
	},
	addNewItem: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		marginTop: 15,
		textAlign: 'center',
	},
	group2: {
		marginTop: 17,
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
	icon8: {
		color: 'rgba(255,255,255,1)',
		fontSize: 33,
		width: 33,
		height: 33,
		marginLeft: 15,
		alignSelf: 'center',
	},
	textInput: {
		color: 'rgba(255,255,255,1)',
		flex: 1,
		marginRight: 11,
		marginLeft: 11,
	},
	icon10Column: {},
	icon10ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(247,247,247,0)',
		borderColor: 'rgba(255,255,255,1)',
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center',
	},
	next: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center',
	},
	container: {flex: 1},
	form: {
		padding: 40,
	},
	group: {
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	selectPicker: {
		paddingBottom: 5,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		marginBottom: 10,
	},
	nextButton: {
		alignItems: 'center',
	},
	groupFiller: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 40,
	},
	centerText: {
		textAlign: 'center',
		fontSize: 22,
		marginBottom: 8,
		color: Colors.DEFAULT
	},
	smallText: {
		textAlign: 'center',
		fontSize: 16,
		marginBottom: 6,
		color: Colors.DEFAULT
	},
	textBold: {
		fontWeight: '500',
		color: '#000'
	},
	buttonText: {
		fontSize: 21,
		color: Colors.DEFAULT
	},
	buttonTouchable: {
		padding: 16
	},
	qrContainer: {
		backgroundColor: 'rgba(230, 230, 230,1)',
		opacity: 1,
	},
	marker: {
		borderColor: Colors.PRIMARY,
		borderWidth: 2,
		padding: 100,
		opacity: 1
	}
})
