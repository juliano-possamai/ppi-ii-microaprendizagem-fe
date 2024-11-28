import { useAuth } from '@/contexts/auth';
import { ErrorInterface } from '@/types/commomTypes';
import { AxiosError } from 'axios';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const defaultErrors: ErrorInterface = {
	message: '',
	errors: []
}

export default function Register() {
	const [errors, setErrors] = useState<ErrorInterface>(defaultErrors);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const { signUp } = useAuth();

	const getErrorField = (field: string) => {
		return errors.errors.find(error => error.field === field)?.error;
	};

	const handleRegister = async () => {
		try {
			await signUp({ username, email, password, passwordConfirmation });
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				return setErrors(error.response.data);
			}

			setErrors({ message: 'Um erro inesperado aconteceu', errors: [] });
		}
	};

	return (
		<ScrollView className="flex-1 pt-12 px-5">
			<View className="mb-4">
				<Text className="text-md font-medium mb-2">Nome do usuário</Text>
				<TextInput
					className="w-full p-4 border border-gray-300 rounded-lg"
					placeholder="Nome do usuário"
					value={username}
					onChangeText={setUsername}
				/>
				{getErrorField('username') && (
					<Text className="text-red-500 mt-1">{getErrorField('username')}</Text>
				)}
			</View>
			<View className="mb-4">
				<Text className="text-md font-medium mb-2">Email</Text>
				<TextInput
					className="w-full p-4 border border-gray-300 rounded-lg"
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				{getErrorField('email') && (
					<Text className="text-red-500 mt-1">{getErrorField('email')}</Text>
				)}
			</View>
			<View className="mb-4">
				<Text className="text-md font-medium mb-2">Senha</Text>
				<TextInput
					className="w-full p-4 border border-gray-300 rounded-lg"
					placeholder="Senha"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				{getErrorField('password') && (
					<Text className="text-red-500 mt-1">{getErrorField('password')}</Text>
				)}
			</View>
			<View className="mb-4">
				<Text className="text-md font-medium mb-2">Confirme a senha</Text>
				<TextInput
					className="w-full p-4 border border-gray-300 rounded-lg"
					placeholder="Confirme a senha"
					value={passwordConfirmation}
					onChangeText={setPasswordConfirmation}
					secureTextEntry
				/>
				{getErrorField('passwordConfirmation') && (
					<Text className="text-red-500 mt-1">{getErrorField('passwordConfirmation')}</Text>
				)}
			</View>

			<TouchableOpacity
				className="w-full bg-blue-600 p-4 rounded-lg flex-row items-center justify-center mb-4"
				onPress={handleRegister}
			>
				<Text className="text-white text-center font-semibold">
					Criar Conta
				</Text>
			</TouchableOpacity>

			<Link href="/(auth)/login" className="text-blue-600 text-center">
				Já tem uma conta? Faça login
			</Link>
		</ScrollView>
	);
}