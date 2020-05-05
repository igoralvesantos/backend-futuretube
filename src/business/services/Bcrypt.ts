import * as bcrypt from 'bcrypt';
import { BcryptGateway } from '../gateways/BcryptGateway';

export class BcryptPassword implements BcryptGateway {
	private saltOrRounds = 10;

	async generateHash(userPassword: string): Promise<string> {
		return await bcrypt.hash(userPassword, this.saltOrRounds);
	}

	async compareHash(inputPassword: string, dbPassword: string): Promise<boolean> {
		return await bcrypt.compare(inputPassword, dbPassword);
	}
}
