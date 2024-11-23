import trailsApi from "@/api/trailsApi";
import SectionContextMenu from "@/components/SectionContextMenu";
import SectionDetailsModal from "@/components/SectionDetailsModal";
import { LearningTrailType, SectionType } from "@/types/trailTypes";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { notify } from "react-native-notificated";

export default function TrailDetails() {
	const navigation = useNavigation();

	const { trailId } = useLocalSearchParams<{ trailId: string }>();
	const [trailDetails, setTrailDetails] = useState<LearningTrailType>({
		_id: '',
		title: '',
		sections: [],
	});

	const [sectionDetails, setSectionDetails] = useState<SectionType | null>(null);
	const [sectionContextMenu, setSectionContextMenu] = useState<SectionType | null>(null);

	const fetchTrailDetails = async () => {
		try {
			const data = await trailsApi.getById(trailId);
			setTrailDetails(data);
		} catch (error) {
			console.error(error);
		}
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
					description: 'Status de leitura alterado',
				},
			});
			fetchTrailDetails();
		} catch (error) {
			console.error(error);
		}
	}

	useFocusEffect(() => {
		//TODO loading
		fetchTrailDetails();
	})

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
				<SectionContextMenu
					section={sectionContextMenu}
					onClose={() => setSectionContextMenu(null)}
					onChangeReadStatus={() => updateReadStatus(sectionContextMenu._id, !sectionContextMenu.read)}
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