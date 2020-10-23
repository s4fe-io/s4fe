import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import AuthLoadingScreen from '../screens/Auth/AuthLoading'

import PhoneNumberScreen from '../screens/SignUp'
import EnterPinScreen from '../screens/SignUp/EnterPin'
import RegisterScreen from '../screens/SignUp/Register'
import LogInScreen from '../screens/Auth/LogIn'
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword'

import UserProfileScreen from '../screens/UserProfile'
import ScanNFCScreen from '../screens/Items/ScanNFC'
import AddItemScreen from '../screens/Items/AddItem'
import EditItemScreen from '../screens/Items/EditItem'
import TransferItemScreen from '../screens/Transfer/TransferItem'
import ChatScreen from '../screens/Chat'
import ScanNFCTagScreen from '../screens/Items/ScanNFCTag'

// import SocialAuthScreen from '../screens/SocialAuth'

const AppStack = createStackNavigator({
	UserProfile: {
		screen: UserProfileScreen,
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
	Chat: {
		screen: ChatScreen,
		navigationOptions: {headerShown: false},
	},

})

const AuthStack = createStackNavigator({
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
	LogIn: {
		screen: LogInScreen,
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
