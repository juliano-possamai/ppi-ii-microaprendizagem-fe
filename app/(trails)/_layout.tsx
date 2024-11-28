import React from 'react';
import { View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/auth';

interface TabBarIconProps {
	focused: boolean;
	color: string;
	size: number;
	name: keyof typeof Ionicons.glyphMap;
}

const TabBarIcon = ({ focused, color, size, name }: TabBarIconProps) => (
	<View className={`rounded-full ${focused ? 'bg-blue-100' : ''}`}>
		<Ionicons name={name} size={size} color={color} />
	</View>
);

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
					paddingBottom: 8,
					paddingTop: 8,
					borderTopWidth: 1,
					borderTopColor: '#e2e8f0',
					elevation: 8,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 4
				},
				tabBarActiveTintColor: '#3b82f6',
				tabBarInactiveTintColor: '#94a3b8',
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600',
					marginTop: 4
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Trilhas',
					tabBarIcon: ({ focused, color, size }) => (
						<TabBarIcon focused={focused} color={color} size={size} name="book-outline" />
					)
				}}
			/>
			<Tabs.Screen
				name="upload"
				options={{
					title: 'Nova trilha',
					tabBarIcon: ({ focused, color, size }) => (
						<TabBarIcon focused={focused} color={color} size={size} name="add-outline" />
					)
				}}
			/>
			<Tabs.Screen
				name="[trailId]"
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
						<TabBarIcon focused={focused} color={color} size={size} name="log-out-outline" />
					)
				}}
			/>
		</Tabs>
	);
}