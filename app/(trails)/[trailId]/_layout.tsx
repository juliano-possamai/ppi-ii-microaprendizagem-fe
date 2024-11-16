import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { Button, TouchableOpacity } from "react-native";

export default function TrailDetailsLayout() {
	const navigation = useNavigation();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Detalhes da trilha',
					headerShown: true,
					headerTitleAlign: 'center',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
							<Ionicons name="arrow-back" size={24} color="black" />
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	)
}