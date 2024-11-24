import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import trailsApi from '@/api/trailsApi';
import { LearningTrailType, SectionType } from '@/types/trailTypes';
import { useLoading } from '@/contexts/loading';

export default function Trails() {
	const [trails, setTrails] = useState<LearningTrailType[]>([]);
	const { setLoading } = useLoading();

	const countReadSections = (sections: SectionType[]) => {
		return sections.filter((section) => section.read).length;
	}

	const fetchTrails = async () => {
		setLoading(true);
		try {
			const data = await trailsApi.getAll();
			setTrails(data);
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			fetchTrails();
		}, [])
	);

	return (
		<View className="flex-1 pt-12 px-5">
			<Text className="text-2xl font-bold mb-4">Minhas trilhas</Text>
			<FlatList
				data={trails}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="bg-gray-50 p-4 rounded-lg mb-3"
						onPress={() => router.push(`/(trails)/${item._id}`)}
					>
						<Text className="text-lg font-semibold mb-2">{item.title}</Text>
						<Text className="text-gray-600">
							Progresso: {countReadSections(item.sections)}/{item.sections.length} seções
						</Text>
						<View className="w-full bg-gray-200 h-2 rounded-full mt-2">
							<View
								className="bg-blue-600 h-2 rounded-full"
								style={{
									width: `${(countReadSections(item.sections) / item.sections.length) * 100}%`,
								}}
							/>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}