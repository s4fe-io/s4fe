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
import messaging from '@react-native-firebase/messaging';


console.disableYellowBox = true;

const App: () => React = () => {
	async function requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
		}
	}

	useEffect(() => {
		requestUserPermission()
		// const unsubscribe = messaging().onMessage(async remoteMessage => {
		// 	Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		// });

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
