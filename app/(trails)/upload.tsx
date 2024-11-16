import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Upload() {
	const [title, setTitle] = useState('');
	const [pageStart, setPageStart] = useState('');
	const [pageEnd, setPageEnd] = useState('');
	const [selectedFile, setSelectedFile] = useState<string | null>(null);

	const handleFilePick = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: 'application/pdf',
			});

			if (result.assets && result.assets[0]) {
				setSelectedFile(result.assets[0].name);
			}
		} catch (err) {
			console.error('Error picking document:', err);
		}
	};

	const handleUpload = () => {
		// TODO: Implement actual upload logic
		router.back();
	};

	return (
		//TODO adicionar cabeçalho
		<View className="flex-1 pt-16 p-5 gap-4">
			<TextInput
				className="w-full p-4 border border-gray-300 rounded-lg"
				placeholder="Content Title"
				value={title}
				onChangeText={setTitle}
			/>

			<View className="flex-row gap-4 space-x-4 mb-4">
				<TextInput
					className="flex-1 p-4 border border-gray-300 rounded-lg"
					placeholder="Start Page"
					value={pageStart}
					onChangeText={setPageStart}
					keyboardType="number-pad"
				/>
				<TextInput
					className="flex-1 p-4 border border-gray-300 rounded-lg"
					placeholder="End Page"
					value={pageEnd}
					onChangeText={setPageEnd}
					keyboardType="number-pad"
				/>
			</View>

			<TouchableOpacity
				className="w-full bg-gray-200 p-4 rounded-lg flex-row items-center justify-center mb-4"
				onPress={handleFilePick}
			>
				<Ionicons name="document-attach-outline" size={24} color="black" />
				<Text className="text-center ml-2">
					{selectedFile ? selectedFile : 'Select PDF File'}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="w-full bg-blue-600 p-4 rounded-lg flex-row items-center justify-center"
				onPress={handleUpload}
			>
				<Text className="text-white text-center font-semibold ml-2">
					Create Learning Trail
				</Text>
			</TouchableOpacity>
		</View>
	);
}