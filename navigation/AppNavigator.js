import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux';
import { SplashScreen } from '../screens';

const AppNavigator = ({ onLayout }) => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

	return (
		<NavigationContainer onReady={onLayout}>
			{didTryAutoLogin && isAuth && <MainNavigator />}
			{!didTryAutoLogin && !isAuth && <SplashScreen />}
			{didTryAutoLogin && !isAuth && <AuthNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
