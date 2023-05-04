import { View, Text, Button, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/authSlice';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const { name, email, phoneNumber, avatar, updatedAt, createdAt } =
		currentUser;
	const created = new Date(createdAt).toUTCString();
	const updated = new Date(updatedAt).toUTCString();

	const handleLogOut = () => {
		dispatch(logOut());
	};
	return (
		<View className='flex-1 bg-white justify-center items-center'>
			<Image
				source={{ uri: 'https:' + avatar }}
				className='w-56 h-56 bg-black rounded-full'
				resizeMode='cover'
			/>
			<Text>{name}</Text>
			<Text>{phoneNumber}</Text>
			<Text>{email}</Text>
			<Text>{created}</Text>
			<Text>{updated}</Text>

			<Button title='Log Out' onPress={handleLogOut} />
		</View>
	);
};

export default HomeScreen;
