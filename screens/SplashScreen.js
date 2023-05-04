import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';
import { authenticate, setDidTryAutoLogin } from '../store/authSlice';
import axios from '../axios';
const SplashScreen = () => {
	let token = null;
	const dispatch = useDispatch();

	useEffect(() => {
		const getUserInfo = async () => {
			//get token from storage and request for user info

			token = await AsyncStorage.getItem('token');

			if (!token) {
				//setTimeout(() => navigation.replace('SignInPromptScreen'), 2000);
				console.log('no token');
				dispatch(setDidTryAutoLogin());
				return;
			}
			try {
				console.log(token);
				const response = await axios.get('/api/auth/me', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (!response) {
					const data = await response.data;
					console.log(data);
					throw new Error('Something went wrong!');
				} else {
					const data = await response.data;
					dispatch(authenticate({ token, user: data }));
					dispatch(setDidTryAutoLogin());
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getUserInfo();
	}, []);

	return (
		<View className='flex-1 items-center justify-center '>
			<StatusBar style='light' />
			<LinearGradient
				// Background Linear Gradient
				colors={Colors.PRIMARY}
				className='absolute left-0 right-0 top-0 bottom-0'
			/>
			<Text className='text-5xl text-white font-GILMER_BOLD '>eaSt</Text>
			<Text className='text-xl text-white font-GILMER_MEDIUM'>
				We create food trends
			</Text>
		</View>
	);
};

export default SplashScreen;
