import { SectionType } from '@/types/trailTypes';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface ItemModalProps {
	section: SectionType;
	onClose: () => void;
	goToNextSection: () => void;
	goToPreviousSection: () => void;
}

const SectionDetailsModal: React.FC<ItemModalProps> = ({ section: item, onClose, goToNextSection, goToPreviousSection }) => {
	return (
		<Modal
			animationType="slide"
			visible={true}
			onRequestClose={onClose}
			className="p-20"
		>
			<View className="flex-1 justify-center items-center p-5">
				<View className="w-full">
					<TouchableOpacity onPress={onClose}>
						<Ionicons name="close" size={36} color="#4B5563" />
					</TouchableOpacity>
				</View>
				<Text className="mt-2 text-lg font-bold text-gray-800 mb-4">{item.name}</Text>
				<ScrollView className="mb-4">
					<Text className="text-lg text-gray-600">
						{'\t'}{item.content}
					</Text>
				</ScrollView>
				<View className="flex-row justify-between mt-4">
					<TouchableOpacity
						onPress={goToPreviousSection}
						className="flex-1 p-4 flex-row items-center justify-center rounded-lg mr-2 border-2 border-gray-400"
					>
						<Ionicons name="arrow-back-outline" size={24} color="#4B5563" />
						<Text className="ml-2 text-base text-gray-700">Voltar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => goToNextSection()}
						className="flex-1 p-4 rounded-lg flex-row items-center justify-center ml-2"
					>
						<Text className="text-base text-gray-700">Avançar</Text>
						<Ionicons name="arrow-forward-outline" className="ml-2" size={24} color="#4B5563" />
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default SectionDetailsModal;