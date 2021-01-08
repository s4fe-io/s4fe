import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import {Dimensions, Platform} from 'react-native'
import {color} from "react-native-reanimated";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
	body: {
		backgroundColor: Colors.PRIMARY,
		flex: 1,
	},
	ellipse: {
		position: 'absolute',
	},
	ellipseStack: {
		height: height,
		marginTop: height * 0.02,
	},
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: height * 0.1
	},
	subSettings: {
		height: 118,
		marginTop: 12,
	},
	editProfile: {
		height: 30,
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

	icon2: {
		color: 'rgba(250,250,250,1)',
		fontSize: 25,
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
		flex: 1
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
		color: Colors.DEFAULT,
		fontSize: 35,
	},
	userEmail: {
		color: Colors.DEFAULT,
		fontSize: 16,
	},
	userNameColumn: {
		marginLeft: 40,
		marginTop: 15,
		marginBottom: 10
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
		height: height * 0.35,
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
	rect2: {
		flex: 1,
	},
	rect2_imageStyle: {},
	defaultText: {
		fontSize: 20,
		color: Colors.DEFAULT
	},
	note: {
		color: Colors.BLOCK
	},
	fab: {
		backgroundColor: Colors.PRIMARY
	},
})
