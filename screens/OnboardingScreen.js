import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	useWindowDimensions,
	Dimensions,
	StyleSheet,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomLinearGradient from '../components/CustomLinearGradient';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
	const { width, height } = Dimensions.get('window');
	const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
	const ref = React.useRef();
	const updateCurrentSlideIndex = (e) => {
		const contentOffsetX = e.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / width);
		setCurrentSlideIndex(currentIndex);
	};
	const navigation = useNavigation();

	const goToNextSlide = () => {
		const nextSlideIndex = currentSlideIndex + 1;
		if (nextSlideIndex != slides.length) {
			const offset = nextSlideIndex * width;
			ref?.current.scrollToOffset({ offset });
			setCurrentSlideIndex(currentSlideIndex + 1);
		}
		if (currentSlideIndex == slides.length - 1) {
			navigation.replace('SignInPromptScreen');
		}
	};

	const slides = [
		{
			id: '1',
			image: require('../assets/chocolates.jpg'),
			title: 'Top chefs',
			content:
				'We have chosen the best of the best to ensure that you enjoy your meals and come back to us every time for more',
		},
		{
			id: '2',
			image: require('../assets/noodles.jpg'),
			title: 'Fresh and tasty',
			content:
				"We create our won food trends that you'll love .We use only the freshest products every day",
		},
		{
			id: '3',
			image: require('../assets/eatingPizza.jpg'),
			title: 'Eat EveryWhere',
			content:
				"Where it's convenient for you.we'll deliver everything you need for your comfort",
		},
	];

	const SlideComponent = ({ item }) => (
		<View style={{ width }}>
			<Image
				source={item.image}
				className='w-full self-center  rounded-b-3xl'
			/>
			<Text className='font-GILMER_HEAVY text-3xl font self-center mt-8 '>
				{item.title}
			</Text>
			<Text className='font-GILMER_MEDIUM self-center px-5 py-4  '>
				{item.content}
			</Text>
		</View>
	);
	const Footer = () => {
		return (
			<View
				style={{
					height: height * 0.25,
					justifyContent: 'space-between',
					paddingHorizontal: 20,
				}}
			>
				{/* Indicator container */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					{/* Render indicator */}
					{slides.map((_, index) => (
						<View
							key={index}
							style={[
								styles.indicator,
								currentSlideIndex == index && {
									backgroundColor: '#DC220F',
									width: 7,
									borderRadius: 50,
								},
							]}
						/>
					))}
				</View>

				{/* Render buttons */}
				<View className='my-9'>
					<CustomLinearGradient
						className='mx-5 my-4 items-center py-2 rounded-3xl'
						onPress={goToNextSlide}
					>
						<Text className='text-white font-GILMER_BOLD text-xl'>
							Next
						</Text>
					</CustomLinearGradient>
					<TouchableOpacity
						className='mx-5  items-center  rounded-3xl'
						onPress={() => navigation.replace('SignInPromptScreen')}
					>
						<Text className='text-black font-GILMER_MEDIUM text-xl'>
							Skip
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	return (
		<View className='flex-1 bg-white'>
			<StatusBar style='light' />
			<FlatList
				ref={ref}
				onMomentumScrollEnd={updateCurrentSlideIndex}
				data={slides}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <SlideComponent item={item} />}
			/>
			<Footer />
		</View>
	);
};

const styles = StyleSheet.create({
	indicator: {
		height: 7,
		width: 7,
		backgroundColor: Colors.GREY4,
		marginHorizontal: 3,
		borderRadius: 50,
	},
});

export default OnboardingScreen;
