import { View, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const ForgotPasswordScreen = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [resetCode, setResetCode] = useState();
	const [resetCodeFromUser, setResetCodeFromUser] = useState();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const handleForgotPassword = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				'http://192.168.0.108:8001/api/auth/forgot_password',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
					}),
				}
			);
			const data = await response.json();
			setResetCode(data.resetCode);
			//console.log(data);
		} catch (error) {
			setLoading(false);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	const handleVerification = () => {
		if (resetCodeFromUser === resetCode) {
			//navigate to Reset Code
			navigation.navigate('ResetPasswordScreen', { resetCode, email });
		}
	};
	return (
		<KeyboardAwareScrollView
			className='bg-white'
			showsVerticalScrollIndicator={false}
		>
			<StatusBar style='light' />
			{resetCode ? (
				<View className=' flex-1 bg-white'>
					<View className='items-center mb-8'>
						<Text className='text-3xl font-GILMER_BOLD mb-2 mt-36'>
							Enter the Reset Code
						</Text>
						<Text className='text-lg my-2 font-GILMER_REGULAR  px-5'>
							Enter The Reset Code From The Email We Just Sent You At{' '}
							{email}
						</Text>
					</View>

					<CustomTextInput
						placeholder={'Reset Code'}
						value={resetCodeFromUser}
						onChangeText={setResetCodeFromUser}
					/>

					<CustomLinearGradient
						className='mx-4 mt-6 mb-2 items-center py-3 rounded-3xl'
						onPress={handleVerification}
					>
						{loading ? (
							<ActivityIndicator size={'large'} color='white' />
						) : (
							<Text className='text-white font-GILMER_BOLD text-xl'>
								Verify
							</Text>
						)}
					</CustomLinearGradient>
				</View>
			) : (
				<View className=' flex-1 bg-white'>
					<View className='items-center mb-8'>
						<Text className='text-3xl font-GILMER_BOLD mb-2 mt-36'>
							Forgot Password
						</Text>
						<Text className='text-lg my-2 font-GILMER_REGULAR  px-5'>
							Please enter your your email so we can help you recover
							your password
						</Text>
					</View>

					<CustomTextInput
						placeholder={'Email'}
						iconLeft='mail'
						value={email}
						onChangeText={setEmail}
					/>

					<CustomLinearGradient
						className='mx-4 mt-6 mb-2 items-center py-3 rounded-3xl'
						onPress={handleForgotPassword}
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
			)}
		</KeyboardAwareScrollView>
	);
};

export default ForgotPasswordScreen;
