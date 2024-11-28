import { CreateUserRequestInterface, LoginRequestInterface, LoginResponseInterface } from '@/types/authTypes';
import api from './api';

class AuthApi {

	async login(data: LoginRequestInterface): Promise<LoginResponseInterface> {
		const response = await api.post('/auth/password', data);
		return response.data;
	}

	async createUser(data: CreateUserRequestInterface): Promise<LoginResponseInterface> {
		const response = await api.post('/users', data);
		return response.data;
	}

}

export default new AuthApi();