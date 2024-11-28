import { useAuth } from "@/contexts/auth";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <Text>Carregando informações...</Text>;
	}

	if (isAuthenticated) {
		return <Redirect href="/(trails)" />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="login"
				options={{
					title: 'Login',
					headerShown: true,
					headerTitleAlign: 'center'
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					title: 'Criar conta',
					headerShown: true,
					headerTitleAlign: 'center'
				}}
			/>
		</Stack>
	);
}