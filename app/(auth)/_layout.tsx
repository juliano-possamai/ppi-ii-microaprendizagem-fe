import { useAuth } from "@/contexts/auth";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
	const { isAuthenticated } = useAuth();

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