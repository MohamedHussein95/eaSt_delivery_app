import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomTextInput from '../components/CustomTextInput';
import { Colors } from '../constants';
import { authenticate } from '../store/authSlice';
import axios from '../axios';

const SignUpScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [checked, setChecked] = useState(false);
	const navigation = useNavigation();

	const dispatch = useDispatch();

	const handleSignUp = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/auth/register', {
				name,
				email,
				phoneNumber,
				password,
			});
			const data = await response.data;

			dispatch(authenticate(data));

			console.log(data);
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
				<View className='items-center mb-8 mt-36'>
					<Text className='text-3xl font-GILMER_BOLD mb-2'>Sign Up</Text>
					<Text className='text-lg my-2 font-GILMER_REGULAR  px-5'>
						Welcome to the eaSt.let's take a few steps and register our
						relationship.
					</Text>
				</View>

				<CustomTextInput
					placeholder={'Name'}
					iconLeft='person'
					value={name}
					onChangeText={setName}
				/>
				<CustomTextInput
					placeholder={'Email'}
					iconLeft='mail'
					value={email}
					onChangeText={setEmail}
				/>
				<View className='flex-row  bg-gray-100   mx-4 px-5 py-3 rounded-3xl self-center items-center my-2'>
					<Feather name='phone' size={20} color={Colors.GREY4} />
					<TextInput
						placeholder='Phone number'
						className=' flex-1   px-3'
						placeholderTextColor={Colors.GREY4}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
					/>
				</View>
				<CustomTextInput
					placeholder={'Password'}
					iconLeft='lock'
					iconRight={'eye'}
					value={password}
					onChangeText={setPassword}
				/>

				<CustomLinearGradient
					className='mx-4 mt-6 mb-2 items-center py-3 rounded-3xl'
					onPress={handleSignUp}
				>
					{loading ? (
						<ActivityIndicator size={'large'} color='white' />
					) : (
						<Text className='text-white font-GILMER_BOLD text-xl'>
							Sign Up
						</Text>
					)}
				</CustomLinearGradient>

				<View className='flex-row items-center justify-center  self-center mx-5 '>
					<Checkbox
						color={Colors.PRIMARY[0]}
						uncheckedColor={Colors.PRIMARY[1]}
						status={checked ? 'checked' : 'unchecked'}
						onPress={() => {
							setChecked(!checked);
						}}
					/>
					<Text className='font-GILMER_REGULAR'>
						I agree to the{' '}
						<Text className='text-primary'>terms & conditions </Text>
						and
						<Text className='text-primary'> privacy policy</Text>
					</Text>
				</View>
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
						onPress={() => navigation.navigate('SignInScreen')}
					>
						Already have an account?{' '}
						<Text className='text-primary'>Sign in</Text>
					</Text>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignUpScreen;
