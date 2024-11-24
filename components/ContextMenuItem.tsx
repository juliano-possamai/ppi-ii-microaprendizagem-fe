import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ContextMenuItemProps {
	title: string;
	icon: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ title, icon, onPress }) => {
	return (
		<TouchableOpacity
			className="flex-row items-center p-4 border-b border-gray-200"
			onPress={onPress}
		>
			<Ionicons name={icon} size={24} color="#4B5563" className="mr-2" />
			<Text className="text-base text-gray-700">{title}</Text>
		</TouchableOpacity>
	);
};

export default ContextMenuItem;