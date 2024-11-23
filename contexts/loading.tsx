import React, { createContext, useContext, useState } from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';

interface LoadingProviderProps {
	children: React.ReactNode;
}

interface LoadingContextType {
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
	const [isLoading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ isLoading, setLoading }}>
			{children}
			<Modal
				transparent={true}
				animationType="fade"
				visible={isLoading}
			>
				<View className="absolute w-screen h-screen flex-1 justify-center items-center">
					<View className="absolute w-full h-full bg-black opacity-20" />
					<View>
						<ActivityIndicator size="large" color="#212121" />
						<Text className="text-xl mt-2">Aguarde</Text>
					</View>
				</View>
			</Modal>
		</LoadingContext.Provider>
	);
};

// Custom hook to use the loading context
export const useLoading = (): LoadingContextType => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};