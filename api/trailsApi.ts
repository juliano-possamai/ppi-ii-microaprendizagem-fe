import { CreateTrailRequest, CreateTrailResponse, LearningTrailType, SectionType } from '@/types/trailTypes';
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

	async create(data: CreateTrailRequest): Promise<CreateTrailResponse> {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('pageStart', data.pageStart.toString());
		formData.append('pageEnd', data.pageEnd.toString());

		if (data.file) {
			formData.append('file', data.file as any);
		}

		const response = await api.postForm('/learning-trails', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	}

	async updateSectionReadStatus(id: string, sectionId: string, data: Partial<SectionType>): Promise<void> {
		await api.patch(`/learning-trails/${id}/sections/${sectionId}`, data);
	}

	async delete(learningTrailId: string): Promise<void> {
		await api.delete(`/learning-trails/${learningTrailId}`);
	}

}

export default new TrailsApi();