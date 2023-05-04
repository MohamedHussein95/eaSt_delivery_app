import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants';

const CustomLinearGradient = ({ children, style, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
			<LinearGradient colors={Colors.PRIMARY} style={style}>
				{children}
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default CustomLinearGradient;
