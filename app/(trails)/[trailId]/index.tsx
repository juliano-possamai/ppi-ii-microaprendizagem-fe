import trailsApi from "@/api/trailsApi";
import { LearningTrailType, SectionType } from "@/types/trailTypes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TrailDetails() {
	const navigation = useNavigation();

	const { trailId } = useLocalSearchParams();
	const [trailDetails, setTrailDetails] = useState<LearningTrailType>({
		_id: '',
		title: '',
		sections: [],
	});

	const fetchTrailDetails = async () => {
		try {
			const data = await trailsApi.getById(trailId.toString());
			setTrailDetails(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchTrailDetails();
	}, []);

	const renderSectionItem = ({ item }: { item: SectionType }) => (
		<TouchableOpacity
		  className="p-4 my-2 border border-gray-300 rounded"
		  onPress={() => console.log('section', item)}
		>
		  <Text className="text-lg">{item.name}</Text>
		</TouchableOpacity>
	  );

	return (
		<View className="flex-1 p-5">
			<FlatList
				data={trailDetails.sections}
				renderItem={renderSectionItem}
				keyExtractor={item => item._id}
			/>
		</View>
	);
}