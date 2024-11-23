import '@/styles/global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native';
import { createNotifications } from 'react-native-notificated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoadingProvider } from '@/contexts/loading';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const { NotificationsProvider } = createNotifications({
		isNotch: true,
		defaultStylesSettings: {
			globalConfig: {
				borderType: 'no-border'
			}
		}
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<SafeAreaView className="flex-1 bg-gray-50">
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<NotificationsProvider />
					<LoadingProvider>
						<Stack>
							<Stack.Screen name="(trails)" options={{ headerShown: false }} />
						</Stack>
					</LoadingProvider>
				</ThemeProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
