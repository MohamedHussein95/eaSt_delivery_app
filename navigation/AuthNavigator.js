import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	ForgotPasswordScreen,
	OnboardingScreen,
	ResetPasswordScreen,
	SignInPromptScreen,
	SignInScreen,
	SignUpScreen,
} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
	const [firstLaunch, setFirstLaunch] = useState();
	useEffect(() => {
		const getFirstLaunchValue = async () => {
			const firstLaunchValue = await AsyncStorage.getItem('firstLaunch');

			if (firstLaunchValue !== null) {
				setFirstLaunch(false);
			} else {
				AsyncStorage.setItem('firstLaunch', 'true');
			}
		};
		getFirstLaunchValue();
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={
				firstLaunch ? 'OnboardingScreen' : 'SignInPromptScreen'
			}
		>
			{firstLaunch && (
				<Stack.Screen
					name='OnboardingScreen'
					component={OnboardingScreen}
				/>
			)}

			<Stack.Screen
				name='SignInPromptScreen'
				component={SignInPromptScreen}
			/>
			<Stack.Screen name='SignInScreen' component={SignInScreen} />
			<Stack.Screen name='SignUpScreen' component={SignUpScreen} />
			<Stack.Screen
				name='ForgotPasswordScreen'
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen
				name='ResetPasswordScreen'
				component={ResetPasswordScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;
