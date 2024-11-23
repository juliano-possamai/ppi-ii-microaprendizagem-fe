export interface SectionType {
	_id: string;
	read: boolean;
	name: string;
	content: string;
}

export interface LearningTrailType {
	_id: string;
	title: string;
	sections: SectionType[];
}

export interface CreateTrailRequest {
	title: string;
	pageStart: number;
	pageEnd: number;
	file: FileInterface | null;
}

export interface FileInterface {
	uri: string;
	name: string;
	type: string;
}

export interface CreateTrailResponse {
	_id: string;
}