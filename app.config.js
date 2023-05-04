import 'dotenv/config';
export default {
	expo: {
		name: 'eaSt Delivery',
		slug: 'eaStDelivery',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		splash: {
			image: './assets/splashScreen.png',
			resizeMode: 'contain',
			backgroundColor: '#fff',
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptiveIcon.png',
				backgroundColor: '#fff',
			},
		},
		web: {
			favicon: './assets/favicon.png',
		},
		extra: {
			backend_uri: process.env.BACKEND_URI,
		},
	},
};
