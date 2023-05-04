import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-paper';
import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomTextInput from '../components/CustomTextInput';
import { Colors } from '../constants';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/authSlice';
import axios from '../axios';
const SignInScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const handleSignIn = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/auth/login', {
				email,
				password,
			});
			const data = await response.data;
			console.log(data);
			dispatch(authenticate(data));
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
						Sign In
					</Text>
					<Text className='text-lg my-2 font-GILMER_REGULAR  px-5'>
						Welcome to the eaSt.It's take a few taps to start assembling
						your plate.
					</Text>
				</View>

				<CustomTextInput
					placeholder={'Email'}
					iconLeft='mail'
					value={email}
					onChangeText={setEmail}
				/>

				<CustomTextInput
					value={password}
					onChangeText={setPassword}
					placeholder={'Password'}
					iconLeft='lock'
					iconRight={'eye'}
				/>
				<CustomLinearGradient
					className='mx-4 mt-6 mb-2 items-center py-3 rounded-3xl'
					onPress={handleSignIn}
				>
					{loading ? (
						<ActivityIndicator size={'large'} color='white' />
					) : (
						<Text className='text-white font-GILMER_BOLD text-xl'>
							Sign In
						</Text>
					)}
				</CustomLinearGradient>
				<TouchableOpacity
					onPress={() => navigation.navigate('ForgotPasswordScreen')}
				>
					<View className='  self-end mx-5 my-2 '>
						<Text className='font-GILMER_REGULAR text-primary'>
							Forgot password?
						</Text>
					</View>
				</TouchableOpacity>
				<View className='flex-row items-center justify-center  self-center mx-5  w-11/12 overflow-hidden mt-4'>
					<Divider className='w-full bg-black ' />
					<Text>
						{'\t\t'}Or Sign up with{'\t\t'}
					</Text>
					<Divider className='w-full bg-black' />
				</View>
				<View className='flex-row space-x-10 items-center justify-center bg-re mt-4'>
					<Pressable
						className=' border-primary border-2 rounded-full w-14 h-14 items-center justify-center '
						onPress={() => console.log('pressed')}
					>
						<AntDesign
							name='google'
							size={20}
							color={Colors.PRIMARY[0]}
						/>
					</Pressable>
					<Pressable
						className=' border-facebookColor border-2 rounded-full w-14 h-14 items-center justify-center '
						onPress={() => console.log('pressed')}
					>
						<FontAwesome
							name='facebook'
							size={20}
							color={Colors.facebookColor}
						/>
					</Pressable>
					<Pressable
						className=' border-black border-2 rounded-full w-14 h-14 items-center justify-center '
						onPress={() => console.log('pressed')}
					>
						<AntDesign name='apple1' size={20} color={Colors.BLACK} />
					</Pressable>
				</View>
				<View className='items-center my-8'>
					<Text
						className=' font-GILMER_REGULAR'
						onPress={() => navigation.navigate('SignUpScreen')}
					>
						Don't have an account?{' '}
						<Text className='text-primary'>Sign Up</Text>
					</Text>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignInScreen;
