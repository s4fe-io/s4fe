import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'rgb(255,255,255)',
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
	body: {
		backgroundColor: Colors.PRIMARY,
		flex: 1,
	},
	ellipse: {
		position: 'absolute',
	},
	ellipseStack: {
		height: height,
		marginTop: height * 0.05,
	},
	container: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	settingsList: {
		left: 51,
		height: 409,
		position: 'absolute',
		right: 450,
		bottom: 272,
	},
	accountSettings: {
		top: 0,
		left: 7,
		height: 165,
		position: 'absolute',
		right: 4,
	},
	myItems: {
		color: '#121212',
		fontSize: 18,
		marginTop: -3,
	},
	subSettings: {
		height: 118,
		marginTop: 12,
	},
	editProfile: {
		height: 30,
		flexDirection: 'row',
	},
	macBookPro: {
		color: 'rgba(0,0,0,1)',
		fontSize: 16,
		marginTop: 6,
	},
	macBookProFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon: {
		color: 'rgba(31,178,204,1)',
		fontSize: 30,
	},
	changeConnections: {
		height: 30,
		flexDirection: 'row',
		marginTop: 11,
	},
	rollexPressident: {
		color: 'rgba(0,0,0,1)',
		fontSize: 16,
		marginTop: 6,
	},
	rollexPressidentFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon2: {
		color: 'rgba(31,178,204,1)',
		fontSize: 30,
	},
	editProfileColumn: {
		marginLeft: 10,
		marginRight: 10,
	},
	editProfileColumnFiller: {
		flex: 1,
	},
	providerSettings: {
		height: 30,
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
	},
	iPhoneX: {
		color: 'rgba(0,0,0,1)',
		fontSize: 16,
		marginTop: 6,
	},
	iPhoneXFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon3: {
		color: '#1fb2cc',
		fontSize: 30,
	},
	rect: {
		width: 321,
		height: 139,
		borderWidth: 1,
		borderColor: 'rgba(180,180,180,1)',
	},
	accountSettingsStack: {
		height: 165,
		marginTop: 15,
		marginLeft: 17,
		marginRight: 20,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(235,167,33,1)',
		borderRadius: 5,
		marginTop: 40,
		marginLeft: width * 0.1,
		marginRight: width * 0.1
	},
	button1: {
		height: 59,
		backgroundColor: 'rgba(235,167,33,1)',
		borderRadius: 5,
		marginLeft: width * 0.1,
		marginRight: width * 0.1,
		marginTop: 10
	},
	addItem: {
		color: 'rgba(255,255,255,1)',
		fontSize: 18,
		marginTop: 19,
		textAlign: 'center'
	},
	account4: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		paddingBottom: 20
	},
	userInfo: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		width: 110,
		height: 110,
		borderRadius: 500,
	},
	userName: {
		color: '#1fb2cc',
		fontSize: 30,
	},
	userEmail: {
		color: 'rgba(0,0,0,1)',
		fontSize: 16,
	},
	userNameColumn: {
		marginLeft: 56,
		marginTop: 18,
	},
	avatarRow: {
		flexDirection: 'row',
		marginRight: 10,
	},
	items: {
		marginTop: height * 0.05
	},
	title: {
		fontSize: 20,
		color: Colors.PRIMARY,
		textTransform: 'uppercase'
	},
	containerScroll: {
		marginTop: 5,
		height: height * 0.35
	},
	scrollView: {
		backgroundColor: 'pink',
		marginHorizontal: 20,
	},
	text: {
		fontSize: 42,
	},
	item: {
		padding: 10,
	},

})
