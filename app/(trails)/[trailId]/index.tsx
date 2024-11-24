import trailsApi from "@/api/trailsApi";
import ContextMenu, { ContextMenuOption } from "@/components/ContextMenu";
import SectionContextMenu from "@/components/ContextMenu";
import SectionDetailsModal from "@/components/SectionDetailsModal";
import { useLoading } from "@/contexts/loading";
import { LearningTrailType, SectionType } from "@/types/trailTypes";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { notify } from "react-native-notificated";

const defaultTrailDetails: LearningTrailType = {
	_id: '',
	title: '',
	sections: []
}

export default function TrailDetails() {
	const { trailId } = useLocalSearchParams<{ trailId: string }>();
	const { setLoading } = useLoading();

	const [trailDetails, setTrailDetails] = useState<LearningTrailType>(defaultTrailDetails);
	const [sectionDetails, setSectionDetails] = useState<SectionType | null>(null);
	const [sectionContextMenu, setSectionContextMenu] = useState<SectionType | null>(null);

	const fetchTrailDetails = async () => {
		setLoading(true);
		try {
			const data = await trailsApi.getById(trailId);
			setTrailDetails(data);
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	}

	const goToNextSection = async () => {
		if (sectionDetails && !sectionDetails.read) {
			await updateReadStatus(sectionDetails._id, true);
		}

		const currentIndex = trailDetails.sections.findIndex(section => section._id === sectionDetails?._id);
		const nextItem = trailDetails.sections[currentIndex + 1] || null;
		setSectionDetails(nextItem);
	}

	const goToPreviousSection = () => {
		const currentIndex = trailDetails.sections.findIndex(section => section._id === sectionDetails?._id);
		const previousItem = trailDetails.sections[currentIndex - 1] || null;
		setSectionDetails(previousItem);
	}

	const updateReadStatus = async (sectionId: string, read: boolean) => {
		try {
			await trailsApi.updateSectionReadStatus(trailId, sectionId, { read });
			notify('success', {
				params: {
					title: 'Sucesso!',
					description: `Seção marcada como ${read ? 'lida' : 'não lida'}`,
				},
			});
			fetchTrailDetails();
		} catch (error) {
			console.error(error);
		}
	}

	const contextMenuOptions = useMemo(() => {
		const res: ContextMenuOption[] = [
			{
				title: 'Fechar',
				icon: 'close-outline',
				onPress: () => setSectionContextMenu(null)
			}
		];

		if (sectionContextMenu) {
			res.push({
				title: sectionContextMenu.read ? 'Marcar como não lido' : 'Marcar como lido',
				icon: sectionContextMenu.read ? 'eye-outline' : 'eye-off-outline',
				onPress: () => updateReadStatus(sectionContextMenu._id, !sectionContextMenu.read)
			});
		}

		return res;
	}, [sectionContextMenu]);

	useFocusEffect(
		useCallback(() => {
			fetchTrailDetails();

			return () => {
				setTrailDetails(defaultTrailDetails);
				setSectionDetails(null);
				setSectionContextMenu(null);
			}
		}, [])
	);

	const renderSectionItem = ({ item }: { item: SectionType }) => (
		<TouchableOpacity
			className={`p-4 my-2 border rounded ${item.read ? 'border-green-700' : 'border-gray-300'}`}
			onPress={() => setSectionDetails(item)}
			onLongPress={() => setSectionContextMenu(item)}
		>
			<View className="flex-row items-center">
				{item.read && <Ionicons name="checkmark-circle-outline" className="mr-2" size={24} color="green" />}
				<Text className="text-lg">{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 p-5">
			<FlatList
				data={trailDetails.sections}
				renderItem={renderSectionItem}
				keyExtractor={item => item._id}
			/>

			{sectionContextMenu &&
				<ContextMenu
					options={contextMenuOptions}
					onClose={() => setSectionContextMenu(null)}
				/>
			}

			{sectionDetails &&
				<SectionDetailsModal
					section={sectionDetails}
					onClose={() => setSectionDetails(null)}
					goToNextSection={goToNextSection}
					goToPreviousSection={goToPreviousSection}
				/>
			}
		</View>
	);
}