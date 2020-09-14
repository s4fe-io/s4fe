import React, {Component} from 'react'
import changeNavigationBarColor, {
	hideNavigationBar,
	showNavigationBar,
} from 'react-native-navigation-bar-color'

import MainNavigator from './src/navigation'
changeNavigationBarColor('translucent', true)
// hideNavigationBar();
const App: () => React = () => {
	return <MainNavigator />
}

// const styles = StyleSheet.create({});

export default App
