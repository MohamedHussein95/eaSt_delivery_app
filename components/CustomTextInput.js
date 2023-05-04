import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { Colors } from '../constants';

const CustomTextInput = ({
	iconLeft,
	iconRight,
	placeholder,
	value,
	onChangeText,
}) => {
	return (
		<View className='flex-row  bg-gray-100   mx-4 px-5 py-3 rounded-3xl self-center items-center my-2'>
			<Octicons name={iconLeft} size={20} color={Colors.GREY4} />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				className=' flex-1   px-5'
				placeholderTextColor={Colors.GREY4}
			/>
			<Octicons name={iconRight} size={20} color={Colors.GREY4} />
		</View>
	);
};

export default CustomTextInput;
