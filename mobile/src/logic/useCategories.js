import React, {useEffect, useState} from 'react';
import { Axios } from "../utils/axios";
import { API } from "../utils/api";


export const useCategories = (props)=>{
	const [categories, setCategories] = useState([]);
	const loading = false;

	function getCategories() {
		const categoryUrl = `${API.CATEGORYLIST}${props.categoryId || ''}`;
		Axios.get(categoryUrl)
		.then(res => {
			const result = [];
			res.data.forEach(category => {
				result.push(category)
			});
			if (result?.length > 0){
				setCategories(result);
			}
		})
		.catch(e => {
			console.log('error getting categories', props.categoryId, e);
		})
	};
	return {
		getCategories,
		categories,
		loading,
	};
};
