import React, {Component} from 'react'
import changeNavigationBarColor, {
	hideNavigationBar,
	showNavigationBar,
} from 'react-native-navigation-bar-color'
import { Text } from 'react-native'
import MainNavigator from './src/navigation'
// changeNavigationBarColor('translucent', true)
// hideNavigationBar();
console.disableYellowBox = true;

const App: () => React = () => {
	return <MainNavigator />
}

// const styles = StyleSheet.create({});

export default App
