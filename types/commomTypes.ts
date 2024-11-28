export interface ErrorDetailInterface {
	field: string;
	error: string;
}

export interface ErrorInterface {
	message: string;
	errors: ErrorDetailInterface[];
}