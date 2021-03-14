import React, {Component} from 'react'
import changeNavigationBarColor, {
	hideNavigationBar,
	showNavigationBar,
} from 'react-native-navigation-bar-color'
import { Text } from 'react-native'
import { Root } from "native-base";
import MainNavigator from './src/navigation'
// changeNavigationBarColor('translucent', true)
// hideNavigationBar();
console.disableYellowBox = true;

const App: () => React = () => {
	return (
		<Root>
			<MainNavigator />
		</Root>
	)
}

// const styles = StyleSheet.create({});

export default App
