import React from 'react';
import { View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/auth';

export default function TabNavigation() {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Redirect href="/(auth)/login" />;
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'white',
					height: 80,
					paddingBottom: 5
				},
				tabBarItemStyle: {
					padding: 5
				},
				tabBarActiveTintColor: '#3b82f6',
				tabBarInactiveTintColor: '#94a3b8',
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600'
				}
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Trilhas',
					tabBarIcon: ({ focused, color, size }) => (
						<View className={`rounded-full ${focused ? 'bg-blue-100' : ''}`}>
							<Ionicons name='book-outline' size={size} color={color} />
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name='upload'
				options={{
					title: 'Nova trilha',
					tabBarIcon: ({ focused, color, size }) => (
						<View className={`rounded-full ${focused ? 'bg-blue-100' : ''}`}>
							<Ionicons name='add-outline' size={size} color={color} />
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name='[trailId]'
				options={{
					href: null,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="logout"
				options={{
					title: 'Logout',
					tabBarIcon: ({ focused, color, size }) => (
						<View className={`rounded-full ${focused ? 'bg-blue-100' : ''}`}>
							<Ionicons name='log-out-outline' size={size} color={color} />
						</View>
					)
				}}
			/>
		</Tabs>
	);
}