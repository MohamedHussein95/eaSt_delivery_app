import { useFonts } from 'expo-font';
import * as splashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Fonts } from './constants';
import AppNavigator from './navigation/AppNavigator';
import { store } from './store/store';
import { Provider } from 'react-redux';

splashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts(Fonts);
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await splashScreen.hideAsync();
			console.log('fonts loaded');
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<AppNavigator onLayout={onLayoutRootView} />
		</Provider>
	);
}
