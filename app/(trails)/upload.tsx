import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import trailsApi from '@/api/trailsApi';
import { AxiosError } from 'axios';
import { FileInterface } from '@/types/trailTypes';
import { notify } from 'react-native-notificated';

interface ErrorDetailInterface {
	element: string;
	error: string;
}

interface ErrorInterface {
	message: string;
	errors: ErrorDetailInterface[];
}

interface FormState {
	title: string;
	pageStart: number;
	pageEnd: number;
	file: FileInterface | null;
}

const defaultErrors: ErrorInterface = {
	message: '',
	errors: []
}

const defaultFormState: FormState = {
	title: '',
	pageStart: 1,
	pageEnd: 0,
	file: null
}

export default function Upload() {
	const [errors, setErrors] = useState<ErrorInterface>(defaultErrors);
	const [formState, setFormState] = useState<FormState>(defaultFormState);

	const clearForm = () => {
		setFormState(defaultFormState);
		setErrors(defaultErrors);
	}

	const handleFilePick = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: 'application/pdf',
			});

			if (result.assets && result.assets[0]) {
				setFormState({
					...formState,
					file: {
						uri: result.assets[0].uri,
						name: result.assets[0].name,
						type: 'application/pdf',
					},
				});
			}
		} catch (err) {
			console.error('Erro ao selecionar documento', err);
		}
	};

	const handleUpload = async () => {
		try {
			//TODO loading
			await trailsApi.create(formState);

			notify('success', {
				params: {
					title: 'Sucesso!',
					description: 'Sua nova trilha foi criada',
				},
			});

			clearForm();
			router.back();
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				return setErrors(error.response.data);
			}

			setErrors({ message: 'Um erro inesperado aconteceu', errors: [] });
		}
	};

	const getFieldError = (fieldName: string) => {
		return errors.errors.find(error => error.element === fieldName)?.error;
	};

	const handleInputChange = (name: keyof FormState, value: string | number | FileInterface | null) => {
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<ScrollView className="flex-1 pt-16 px-5">
			<Text className="text-2xl font-bold mb-4">Nova trilha</Text>
			<View className="mb-4">
				<Text className="text-md font-medium mb-2">Título do Conteúdo</Text>
				<TextInput
					className="w-full p-4 border border-gray-300 rounded-lg"
					placeholder="Título do conteúdo"
					value={formState.title}
					onChangeText={(text) => handleInputChange('title', text)}
				/>
				{getFieldError('title') && (
					<Text className="text-red-500 mt-1">{getFieldError('title')}</Text>
				)}
			</View>

			<View className="flex-row gap-3 space-x-4 mb-4">
				<View className="flex-1">
					<Text className="text-md font-medium mb-2">Página Inicial</Text>
					<TextInput
						className="w-full p-4 border border-gray-300 rounded-lg"
						placeholder="Página inicial"
						value={formState.pageStart.toString()}
						onChangeText={(val) => handleInputChange('pageStart', parseInt(val) || 0)}
						keyboardType="number-pad"
					/>
					{getFieldError('pageStart') && (
						<Text className="text-red-500 mt-1">{getFieldError('pageStart')}</Text>
					)}
				</View>

				<View className="flex-1">
					<Text className="text-md font-medium mb-2">Página Final</Text>
					<TextInput
						className="w-full p-4 border border-gray-300 rounded-lg"
						placeholder="Página final"
						value={formState.pageEnd.toString()}
						onChangeText={(val) => handleInputChange('pageEnd', parseInt(val) || 0)}
						keyboardType="number-pad"
					/>
					{getFieldError('pageEnd') && (
						<Text className="text-red-500 mt-1">{getFieldError('pageEnd')}</Text>
					)}
				</View>
			</View>

			<TouchableOpacity
				className="w-full bg-gray-200 p-4 rounded-lg flex-row items-center justify-center mb-4"
				onPress={handleFilePick}
			>
				<Ionicons name="document-attach-outline" size={24} color="black" />
				<Text className="text-center ml-2">
					{formState.file ? formState.file.name : 'Selecione o arquivo PDF'}
				</Text>
			</TouchableOpacity>
			{getFieldError('file') && (
				<Text className="text-red-500 mb-4">{getFieldError('file')}</Text>
			)}

			<TouchableOpacity
				className="w-full bg-blue-600 p-4 rounded-lg flex-row items-center justify-center mb-4"
				onPress={handleUpload}
			>
				<Text className="text-white text-center font-semibold ml-2">
					Criar Trilha de Conhecimento
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}