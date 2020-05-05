import { UserGateway } from '../../gateways/UserGateway';
import { BcryptGateway } from '../../gateways/BcryptGateway';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';
import { JWTAutentication } from '../../services/JWTAutentication';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';

export class ChangePasswordUC {
	constructor(
		private userGateway: UserGateway,
		private bcrypt: BcryptGateway,
		private jwtAuth: JWTAutentication,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: ChangePasswordUCInput): Promise<ChangePasswordUCOutput | undefined> {
		try {
			this.validators.validateChangePasswordInput(input);

			const userInfo = await this.jwtAuth.verifyToken(input.token);

			const user = await this.userGateway.getUserById(userInfo.userId);

			if(!user) {
				throw new NotFoundError('Unregistered user');
			}

			const verifyPassword = await this.bcrypt.compareHash(input.oldPassword, user.getPassword());

			if(!verifyPassword) {
				throw new ConflictError('Incorrect password');
			}

			const hashPassword = await this.bcrypt.generateHash(input.newPassword);

			await this.userGateway.updatePassword(hashPassword, userInfo.userId);

			return {
				message: 'Password successfully updated'
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the change password'
			};
		}
	}
}

export interface ChangePasswordUCInput {
	token: string;
	oldPassword: string;
	newPassword: string;
}

export interface ChangePasswordUCOutput {
	message: string;
}
