import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
	token: null, // for accessing protected routes
	isAuthenticated: null,
	didTryAutoLogin: false, //to conditionally render stacks
	user: null, // for displaying user information
	loading: true,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticate: (state, action) => {
			try {
				const { token, user } = action.payload;
				if (token && user) {
					state.token = token;
					state.user = user;
					state.isAuthenticated = true;
					state.loading = false;
					AsyncStorage.setItem('token', token);
				}
				//console.log(state.token, state.user);
			} catch (error) {
				console.error(error);
			}
		},
		setDidTryAutoLogin: (state) => {
			state.didTryAutoLogin = true;
		},
		logOut: (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			AsyncStorage.removeItem('token');
		},
	},
});

export const { authenticate, setDidTryAutoLogin, logOut } = authSlice.actions;

export default authSlice.reducer;
