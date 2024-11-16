import { Ionicons } from '@expo/vector-icons';
import { Slot, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function TrailsLayout() {
	return (
		<SafeAreaView className="flex-1">
			<Tabs screenOptions={{
				headerShown: false,
			}}>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Trilhas',
						tabBarIcon: ({ color }) => <Ionicons size={28} name='book-outline' color={color} />,
					}}
				/>
				<Tabs.Screen
					name='upload'
					options={{
						title: 'Nova trilha',
						tabBarIcon: ({ color }) => <Ionicons size={28} name='add-outline' color={color} />,
					}}
				/>
				<Tabs.Screen
					name='[trailId]'
					options={{
						href: null,
						headerShown: false,
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}