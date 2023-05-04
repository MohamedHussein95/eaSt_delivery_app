import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default MainNavigator;
