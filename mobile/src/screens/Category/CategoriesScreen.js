import React, { useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { useCategories } from "../../logic/useCategories";
import { CategoryListItem } from "./CategoryListItem";
import Colors from "../../constants/Colors";


export default class CategoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Categories'),
		};
	};
	render() {
		const { navigation } = this.props;
		const categoryId = navigation.getParam('categoryId');
		return (
			<View style={[styles.root,]} backgroundColor={Colors.PRIMARY}>
				<View style={styles.background}>
					<ImageBackground
						style={styles.root}
						imageStyle={styles.rect_imageStyle}
						source={require('../../assets/images/Gradient_EsLX0zX.png')}
					/>
				</View>
				<CategoryWrapper categoryId={categoryId} navigation={this.props.navigation} />
			</View>
		)
	}
};

function CategoryWrapper({ categoryId, navigation }) {
	const { getCategories, categories, loading } = useCategories({
		categoryId: categoryId,
	});
	const redirectScreen = navigation.getParam('redirectScreen', '');

	//console.log('redirect', redirectScreen);
	useEffect(() => {
		getCategories();
	}, []);
	const onCategoryItemPress = (item) => {
		if (item.children.length > 0) {
			navigation.push('CategorySelection', {
				categoryId: item.id,
				title: item.title,
				redirectScreen: redirectScreen
			});
		} else {
			navigation.navigate(redirectScreen, {
				categoryItem: item,
			});
		}
	};
	if (loading) {
		return (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	const renderItem = ({ item, index }) => {
		return <CategoryListItem item={item} onPress={onCategoryItemPress} />
	};
	return (
		<FlatList
			data={categories}
			keyExtractor={(item) => (item.id)}
			renderItem={renderItem}
		/>
	)
}


const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center"
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	},
	background: {
		top: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});
