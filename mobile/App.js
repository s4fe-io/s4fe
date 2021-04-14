import React, { useEffect } from 'react';
import changeNavigationBarColor, {
	hideNavigationBar,
	showNavigationBar,
} from 'react-native-navigation-bar-color'
import { Text } from 'react-native'
import { Root } from "native-base";
import MainNavigator from './src/navigation'
// changeNavigationBarColor('translucent', true)
// hideNavigationBar();
import PushNotification from "react-native-push-notification";

console.disableYellowBox = true;

const App: () => React = () => {

	useEffect(() => {
		initializePushNotifications()

		// return unsubscribe;
	}, []);

	const initializePushNotifications = () => {
		// Must be outside of any component LifeCycle (such as `componentDidMount`).
		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function (token) {
				console.log("TOKEN:", token);
			},

			// (required) Called when a remote is received or opened, or local notification is opened
			onNotification: function (notification) {
				console.log("NOTIFICATION:", notification);

				// process the notification

				// (required) Called when a remote is received or opened, or local notification is opened
				// notification.finish(PushNotificationIOS.FetchResult.NoData);
			},

			// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
			onAction: function (notification) {
				console.log("ACTION:", notification.action);
				console.log("NOTIFICATION:", notification);

				// process the action
			},

			// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
			onRegistrationError: function(err) {
				console.error(err.message, err);
			},

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 * - if you are not using remote notification or do not have Firebase installed, use this:
			 *     requestPermissions: Platform.OS === 'ios'
			 */
			requestPermissions: true,
		});
	}
	return (
		<Root>
			<MainNavigator />
		</Root>
	)
}

// const styles = StyleSheet.create({});

export default App
