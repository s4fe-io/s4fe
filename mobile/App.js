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
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {Axios} from './src/utils/axios'

console.disableYellowBox = true;

const App: () => React = () => {

	useEffect(() => {

		// return unsubscribe;
	}, []);

	return (
		<Root>
			<MainNavigator />
		</Root>
	)
}

// const styles = StyleSheet.create({});

export default App
