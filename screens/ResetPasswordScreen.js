import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomTextInput from '../components/CustomTextInput';

import { useDispatch } from 'react-redux';

const ResetPasswordScreen = ({ route, navigation }) => {
	const resetCode = route.params?.resetCode;
	const email = route.params?.email;
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const handleResetPassword = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				'http://192.168.0.108:8001/api/auth/reset_password',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email ?? 'johnDoe@gmail.com',
						resetCode: resetCode ?? 'R18WX',
						password,
					}),
				}
			);
			const data = await response.json();

			if (!data.ok) {
				console.log('Error resetting password');
				return;
			}
			console.log('password reset');
			navigation.replace('SignInScreen');
			//console.log(data);
		} catch (error) {
			setLoading(false);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<KeyboardAwareScrollView
			className='bg-white'
			showsVerticalScrollIndicator={false}
		>
			<StatusBar style='light' />
			<View className=' flex-1 bg-white'>
				<View className='items-center mb-8'>
					<Text className='text-3xl font-GILMER_BOLD mb-2 mt-36'>
						Reset Password
					</Text>
					<Text className='text-lg my-2 font-GILMER_REGULAR  px-5'>
						Enter Strong New Password No One can Guess Easily
					</Text>
				</View>

				<CustomTextInput
					placeholder={'Password'}
					iconLeft='lock'
					iconRight={'eye'}
					value={password}
					onChangeText={setPassword}
				/>
				<CustomTextInput
					placeholder={'Password'}
					iconLeft='lock'
					iconRight={'eye'}
					value={password}
					onChangeText={setPassword}
				/>

				<CustomLinearGradient
					className='mx-4 mt-6 mb-2 items-center py-3 rounded-3xl'
					onPress={handleResetPassword}
				>
					{loading ? (
						<ActivityIndicator size={'large'} color='white' />
					) : (
						<Text className='text-white font-GILMER_BOLD text-xl'>
							Reset Password
						</Text>
					)}
				</CustomLinearGradient>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default ResetPasswordScreen;
