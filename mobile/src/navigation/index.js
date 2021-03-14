import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import AuthLoadingScreen from '../screens/Auth/AuthLoading'

import PhoneNumberScreen from '../screens/SignUp'
import EnterPinScreen from '../screens/SignUp/EnterPin'
import RegisterScreen from '../screens/SignUp/Register'
import LogInScreen from '../screens/Auth/LogIn'
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword'

import UserProfileScreen from '../screens/UserProfile'
import EditProfileScreen from '../screens/EditProfile'
import ScanNFCScreen from '../screens/Items/ScanNFC'
import AddItemScreen from '../screens/Items/AddItem'
import EditItemScreen from '../screens/Items/EditItem'
import TransferItemScreen from '../screens/Transfer/TransferItem'
import ChatScreen from '../screens/Chat'
import TopicsScreen from '../screens/Chat/Topics'
import ScanNFCTagScreen from '../screens/Items/ScanNFCTag'
import ContactOwnerScreen from '../screens/Items/ContactOwner'
import SearchBySerialScreen from '../screens/SearchBySerial/'
import SearchItemDetailsScreen from '../screens/SearchItemDetails/'
import QRCodeScreen from '../screens/QRCode/'

// import SocialAuthScreen from '../screens/SocialAuth'
const TabBarComponent = (props) => <BottomTabBar {...props} />;

const tabBarOptions = {
	activeTintColor: '#e91e63',
		labelStyle: {
		fontSize: 12,
	},
	style: {
		backgroundColor: 'blue',
	},
}

const BottomTabs = createBottomTabNavigator(
	{
		Home: UserProfileScreen,
		Chat: ChatScreen
	},
	{
	tabBarComponent: (props) => (
		<TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
	),
})

const AppStack = createStackNavigator({
	UserProfile: {
		screen: UserProfileScreen,
		navigationOptions: {headerShown: false},
	},
	EditUserProfile: {
		screen: EditProfileScreen,
		navigationOptions: {headerShown: false},
	},

	ScanNFC: {
		screen: ScanNFCScreen,
		navigationOptions: {headerShown: false},
	},
	AddItem: {
		screen: AddItemScreen,
		navigationOptions: {headerShown: false},
	},
	EditItem: {
		screen: EditItemScreen,
		navigationOptions: {headerShown: false},
	},
	TransferItem: {
		screen: TransferItemScreen,
		navigationOptions: {headerShown: false},
	},
	ScanNFCTag: {
		screen: ScanNFCTagScreen,
		navigationOptions: {headerShown: false},
	},
	ContactOwner: {
		screen: ContactOwnerScreen,
		navigationOptions: {headerShown: false},
	},
	Topics: {
		screen: TopicsScreen,
		navigationOptions: {headerShown: false},
	},
	Chat: {
		screen: ChatScreen,
		navigationOptions: {headerShown: false},
	},
	SearchBySerial: {
		screen: SearchBySerialScreen,
		navigationOptions: {headerShown: false},
	},
	SearchItemDetails: {
		screen: SearchItemDetailsScreen,
		navigationOptions: {headerShown: false},
	},
	QRCode: {
		screen: QRCodeScreen,
		navigationOptions: {headerShown: false},
	},
})

const AuthStack = createStackNavigator({
	LogIn: {
		screen: LogInScreen,
		navigationOptions: {headerShown: false},
	},
	PhoneNumber: {
		screen: PhoneNumberScreen,
		navigationOptions: {headerShown: false},
	},
	EnterPin: {
		screen: EnterPinScreen,
		navigationOptions: {headerShown: false},
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: {headerShown: false},
	},
	ForgotPassword: {
		screen: ForgotPasswordScreen,
		navigationOptions: {headerShown: false},
	},
	// SocialAuth: {
	// 	screen: SocialAuthScreen,
	// 	navigationOptions: {headerShown: false},
	// },
})

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: AppStack,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'AuthLoading',
		},
	),
)
