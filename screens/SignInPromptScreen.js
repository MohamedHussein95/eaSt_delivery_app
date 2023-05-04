import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomLinearGradient from '../components/CustomLinearGradient';
import { Colors } from '../constants';

const SignInPromptScreen = () => {
	const navigation = useNavigation();
	return (
		<View className='flex-1 bg-white'>
			<StatusBar style='light' />
			<View>
				<Image
					source={require('../assets/foodPatternOBg.jpg')}
					className='w-full h-72 self-center opacity-50'
				/>
				<LinearGradient
					colors={['transparent', 'white']}
					style={{ position: 'absolute', width: '100%', height: '100%' }}
				/>
			</View>
			<View className='items-center absolute self-center top-60'>
				<Text
					className='text-8xl text-red-500 font-GILMER_HEAVY drop-shadow-2xl shadow-secondary'
					style={{
						textShadowColor: Colors.PRIMARY[1],
						textShadowOffset: { width: 2, height: 2 },
						textShadowRadius: 5,
					}}
				>
					eaSt
				</Text>
				<Text className='text-sm text-red-500 font-GILMER_MEDIUM'>
					We create food trends
				</Text>
			</View>
			<View className='items-center mt-28 '>
				<Text className='text-3xl font-GILMER_HEAVY '>Hello, foodie!</Text>
				<Text className='text-sm my-2 font-GILMER_MEDIUM'>
					Please choose how you want to proceed.
				</Text>
			</View>
			<View>
				<CustomLinearGradient
					className='mx-5 my-4 items-center py-2 rounded-3xl'
					onPress={() => navigation.navigate('SignInScreen')}
				>
					<Text className='text-white font-GILMER_BOLD text-xl'>
						Sign In
					</Text>
				</CustomLinearGradient>
				<TouchableOpacity
					className='items-center py-2 rounded-3xl mx-5  bg-transparent  border-2 border-primary'
					onPress={() => navigation.navigate('SignUpScreen')}
				>
					<Text className='  font-GILMER_MEDIUM text-xl text-primary'>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SignInPromptScreen;
