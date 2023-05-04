import axios from 'axios';
import Constants from 'expo-constants';
const instance = axios.create({
	baseURL: Constants.manifest?.extra?.backend_uri,
});

export default instance;
