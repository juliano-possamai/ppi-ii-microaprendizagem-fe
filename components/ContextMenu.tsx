import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import ContextMenuItem from './ContextMenuItem';
import { Ionicons } from '@expo/vector-icons';

export interface ContextMenuOption {
	title: string;
	icon: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
}

interface ContextMenuProps {
	options: ContextMenuOption[];
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

const ContextMenu: React.FC<ContextMenuProps> = ({ options, onClose }) => {
	const translateY = useSharedValue(100);

	useEffect(() => {
		translateY.value = withTiming(100, { duration: 150 }, () => {
			translateY.value = withTiming(0, { duration: 150 });
		});
	}, [options]);

	const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

	return (
		<Animated.View style={[animatedStyle, animatedViewStyle]} className="bg-white">
			{options.map((option, index) => (
				<ContextMenuItem
					key={index}
					title={option.title}
					icon={option.icon}
					onPress={() => {
						option.onPress();
						onClose();
					}}
				/>
			))}
		</Animated.View>
	);
};

export default ContextMenu;