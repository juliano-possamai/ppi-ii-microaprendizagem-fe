import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SectionType } from '@/types/trailTypes';
import ContextMenuItem from './ContextMenuItem';

interface ContextMenuProps {
	section: SectionType;
	onChangeReadStatus: () => void;
	onClose: () => void;
}

const animatedViewStyle: object = {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	borderTopLeftRadius: 10,
	borderTopRightRadius: 10,
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5,
	zIndex: 10
};

//reabrir menu ao selecionar outro item
const SectionContextMenu: React.FC<ContextMenuProps> = ({ section, onChangeReadStatus, onClose }) => {
	const translateY = useSharedValue(100);

	useEffect(() => {
		translateY.value = withTiming(100, { duration: 150 }, () => {
			translateY.value = withTiming(0, { duration: 150 });
		});
	}, [section._id]);

	const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

	return (
		<Animated.View style={[animatedStyle, animatedViewStyle]} className="bg-white">
			<ContextMenuItem
				title="Fechar"
				icon="close-outline"
				onPress={onClose}
			/>
			<ContextMenuItem
				title={section.read ? 'Marcar como não lido' : 'Marcar como lido'}
				icon={section.read ? "eye-outline" : "eye-off-outline"}
				onPress={() => {
					onChangeReadStatus();
					onClose();
				}}
			/>
		</Animated.View>
	);
};

export default SectionContextMenu;