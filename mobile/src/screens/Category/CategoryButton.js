import React, { useEffect, Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class CategoryButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCategory: this.props.selectedCategory,
            redirectTo: this.props.redirectTo
        }
    }

    onCategorySelected = (item) => {
        this.props.onCategorySelected(item);
    }

	render() {
        const { selectedCategory, redirectTo } = this.state;
        if (selectedCategory !== this.props.selectedCategory){
            this.setState({'selectedCategory': this.props.selectedCategory});
        }
		const { navigation } = this.props;
        const onCategoryPress = () =>{
			navigation.navigate('CategorySelection', {
				redirectScreen: redirectTo
			});
		};

        const navigationCategory = navigation.getParam('categoryItem');
		if (navigationCategory && this.state.selectedCategory != navigationCategory){
			this.setState({
				'selectedCategory': navigationCategory
			});
            this.onCategorySelected(navigationCategory);
		}
		const categoryName = this.state.selectedCategory == null ? "Category" : this.state.selectedCategory.title;

		return (
			<View style={styles.selectPicker}>
                <TouchableOpacity
                    style={styles.categoryPicker}
                    onPress={onCategoryPress}
                >
                    <Text style={styles.category}>{ categoryName }</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={onCategoryPress}>
                    <TextInput
                        placeholder="Category"
                        placeholderTextColor="rgba(255,255,255,1)"
                        style={[styles.category]}
                        editable={false}
                        value={categoryName}
                    />
                </TouchableOpacity> */}
            </View>
		)
	}
};

const styles = StyleSheet.create({
	selectPicker: {
		paddingBottom: 5,
		backgroundColor: 'rgba(251,247,247,0.25)',
		borderRadius: 5,
		marginBottom: 10,
	},
	categoryPicker: {
		padding: 10
	},
	category: {
		color: 'white',
		textAlign: 'center'
	}
});
