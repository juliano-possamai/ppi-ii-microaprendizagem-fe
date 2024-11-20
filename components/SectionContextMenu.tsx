import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SectionType } from '@/types/trailTypes';

interface ContextMenuProps {
	section: SectionType;
	onChangeReadStatus: () => void;
	onClose: () => void;
}

const SectionContextMenu: React.FC<ContextMenuProps> = ({ section, onChangeReadStatus, onClose }) => {
	return (
		<View className="absolute top-0 rounded-lg border-gray-600 shadow-lg z-10">
			<TouchableOpacity
				className="flex-row items-center p-4"
				onPress={onClose}
			>
				<Ionicons name="close-outline" size={24} color="#4B5563" className="mr-2" />
				<Text className="text-base text-gray-700">Fechar</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="flex-row items-center p-4"
				onPress={() => {
					onChangeReadStatus();
					onClose();
				}}
			>
				<Ionicons
					name={section.read ? "eye-outline" : "eye-off-outline"}
					size={24} color="#4B5563"
					className="mr-2"
				/>
				<Text className="text-base text-gray-700">
					{section.read ? 'Marcar como não lido' : 'Marcar como lido'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SectionContextMenu;