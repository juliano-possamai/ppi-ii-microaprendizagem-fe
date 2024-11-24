import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabNavigation() {
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
					tabBarIcon: ({ color, size }) => (
						<View className={`rounded-full ${color === '#3b82f6' ? 'bg-blue-100' : ''}`}>
							<Ionicons name='book-outline' size={size} color={color} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name='upload'
				options={{
					title: 'Nova trilha',
					tabBarIcon: ({ color, size }) => (
						<View className={`rounded-full ${color === '#3b82f6' ? 'bg-blue-100' : ''}`}>
							<Ionicons name='add-outline' size={size} color={color} />
						</View>
					),
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
	);
}