import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import trailsApi from '@/api/trailsApi';
import { LearningTrailType, SectionType } from '@/types/trailTypes';
import { useLoading } from '@/contexts/loading';
import ContextMenu, { ContextMenuOption } from '@/components/ContextMenu';
import { notify } from 'react-native-notificated';
import { Ionicons } from '@expo/vector-icons';

export default function Trails() {
	const router = useRouter();
	const { setLoading } = useLoading();

	const [trails, setTrails] = useState<LearningTrailType[]>([]);
	const [trailContextMenu, setTrailContextMenu] = useState<LearningTrailType | null>(null);

	const countReadSections = (sections: SectionType[]) => sections.filter((section) => section.read).length;

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

	const deleteTrail = async (trailId: string) => {
		setLoading(true);
		try {
			await trailsApi.delete(trailId);
			await fetchTrails();
			notify('success', {
				params: {
					title: 'Sucesso!',
					description: 'Trilha excluída'
				}
			});
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	}

	const contextMenuOptions = useMemo(() => {
		const res: ContextMenuOption[] = [
			{
				title: 'Fechar',
				icon: 'close-outline',
				onPress: () => setTrailContextMenu(null)
			}
		];

		if (trailContextMenu) {
			res.push({
				title: 'Excluir',
				icon: 'trash-outline',
				onPress: () => deleteTrail(trailContextMenu._id)
			});
		}

		return res;
	}, [trailContextMenu]);

	useFocusEffect(
		useCallback(() => {
			fetchTrails();
		}, [])
	);

	return (
		<View className="flex-1 pt-12 px-5">
			<Text className="text-2xl font-bold mb-4">Minhas trilhas</Text>
			{!trails.length && (
				<View className="flex-1 mt-5 items-center justify-center">
					<Ionicons name="book-outline" size={64} color="#9CA3AF" />
					<Text className="text-xl font-semibold text-gray-600 mt-4">Nenhuma trilha encontrada</Text>
					<Text className="text-base text-gray-500 text-center mt-2 max-w-xs">
						Parece que você ainda não tem trilhas. Comece sua jornada de aprendizado agora!
					</Text>
					<TouchableOpacity
						className="mt-6 bg-blue-600 py-3 px-6 rounded-full"
						onPress={() => { router.push('/(trails)/upload') }}
					>
						<Text className="text-white font-semibold">Adicionar Trilha</Text>
					</TouchableOpacity>
				</View>
			)}
			<FlatList
				data={trails}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="bg-gray-50 p-4 rounded-lg mb-3"
						onPress={() => router.push(`/(trails)/${item._id}`)}
						onLongPress={() => setTrailContextMenu(item)}
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
			{trailContextMenu && (
				<ContextMenu
					options={contextMenuOptions}
					onClose={() => setTrailContextMenu(null)}
				/>
			)}
		</View>
	);
}