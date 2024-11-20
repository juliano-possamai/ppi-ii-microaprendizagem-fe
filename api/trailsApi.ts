import { LearningTrailType, SectionType } from '@/types/trailTypes';
import api from './api';

/*
TODO
tipar objetos de entrada e de saída
implementar tratamento de erros
*/

class TrailsApi {

	async getAll(): Promise<LearningTrailType[]> {
		const response = await api.get('/learning-trails');
		return response.data;
	}

	async getById(learningTrailId: string): Promise<LearningTrailType> {
		const response = await api.get(`/learning-trails/${learningTrailId}`);
		return response.data;
	}

	async create(data: Partial<LearningTrailType>): Promise<LearningTrailType> {
		const response = await api.post('/learning-trails', data);
		return response.data;
	}

	async updateSectionReadStatus(id: string, sectionId: string, data: Partial<SectionType>): Promise<SectionType> {
		const response = await api.patch(`/learning-trails/${id}/sections/${sectionId}`, data);
		return response.data;
	}

	async delete(learningTrailId: string): Promise<void> {
		await api.delete(`/learning-trails/${learningTrailId}`);
	}

}

export default new TrailsApi();