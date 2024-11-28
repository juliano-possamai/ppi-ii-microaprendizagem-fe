import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { CreateUserRequestInterface, LoginRequestInterface, UserInterface } from '@/types/authTypes';
import authApi from '@/api/authApi';
import api from '@/api/api';

interface AuthProviderProps {
    children: React.ReactNode;
}

type AuthContextType = {
	signIn: (data: LoginRequestInterface) => Promise<void>;
	signUp: (data: CreateUserRequestInterface) => Promise<void>;
	signOut: () => Promise<void>;
	isLoading: boolean;
	isAuthenticated: boolean;
	user: UserInterface
};

const AuthContext = createContext<AuthContextType | null>(null);
const userStoreKey = '__user';
const tokenStoreKey = '__accessToken';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const emptyUser = { username: '' };
	const [user, setUser] = useState({...emptyUser});

	useEffect(() => {
		loadToken();
	}, []);

	const loadToken = async () => {
		try {
			const token = SecureStore.getItem(tokenStoreKey);
			const user = SecureStore.getItem(userStoreKey);

			if (!token || !user) {
				setIsAuthenticated(false);
				return;
			}

			setUser(JSON.parse(user));
			setIsAuthenticated(true);
			api.defaults.headers.Authorization = `Bearer ${token}`;
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const signIn = async (data: LoginRequestInterface) => {
		const response = await authApi.login(data);
		api.defaults.headers.Authorization = `Bearer ${response.accessToken}`;
		await storeTokenAndUser({ username: response.user.username }, response.accessToken);
	};

	const signUp = async (data: CreateUserRequestInterface) => {
		const response = await authApi.createUser(data);
		await storeTokenAndUser({ username: response.user.username }, response.accessToken);
	};

	const signOut = async () => {
		await SecureStore.deleteItemAsync(userStoreKey);
		await SecureStore.deleteItemAsync(tokenStoreKey);
		setUser({...emptyUser});
		setIsAuthenticated(false);
	}

	const storeTokenAndUser = async (user: any, token: string) => {
		await SecureStore.setItemAsync(userStoreKey, JSON.stringify(user));
		await SecureStore.setItemAsync(tokenStoreKey, token);
		setIsAuthenticated(true);
	};

	return (
		<AuthContext.Provider value={{ signIn, signUp, signOut, isLoading, isAuthenticated, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}