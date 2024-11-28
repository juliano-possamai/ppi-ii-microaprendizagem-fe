export interface UserInterface {
	username: string;
}

export interface CreateUserRequestInterface {
	username: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface LoginRequestInterface {
	email: string;
	password: string;
}

export interface LoginResponseInterface {
	user: UserInterface;
	accessToken: string;
}