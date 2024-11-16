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