export interface BcryptGateway {
	generateHash(userPassword: string): Promise<string>;
	compareHash(inputPassword: string, dbPassword: string): Promise<boolean>;
}