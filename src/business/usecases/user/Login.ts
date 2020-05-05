import { UserGateway } from '../../gateways/UserGateway';
import { BcryptGateway } from '../../gateways/BcryptGateway';
import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { NotFoundError } from '../../errors/NotFoundError';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { RefreshTokenGateway } from '../../gateways/RefreshTokenGateway';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../../services/JWTAutentication';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class LoginUC {
	constructor(
		private db: UserGateway,
		private jwtAuth: JWTAutenticationGateway,
		private bcrypt: BcryptGateway,
		private validators: ValidatorsGateway,
		private refreshTokenDB: RefreshTokenGateway
	) {}

	public async execute(input: LoginUCInput): Promise<LoginUCOutput | undefined> {
		try {
			this.validators.validateLoginInput(input);

			const user = await this.db.getUserByEmail(input.email);

			if(!user) {
				throw new NotFoundError('Unregistered user');
			}

			const checkPassword = await this.bcrypt.compareHash(input.password, user.getPassword());

			if (!checkPassword) {
				throw new ForbiddenError('Invalid email or password');
			}

			const accessToken = this.jwtAuth.generateToken(
				{ userId: user.getId() }, 
				ACCESS_TOKEN_EXPIRES
			);

			const refreshToken = this.jwtAuth.generateToken(
				{ userId: user.getId(), userDevice: input.device }, 
				REFRESH_TOKEN_EXPIRES
			);

			const verifyRefreshToken = await this.refreshTokenDB.getRefreshToken(input.device, user.getId());

			if (verifyRefreshToken) {
				await this.refreshTokenDB.deleteRefreshToken(input.device, user.getId());
			}

			await this.refreshTokenDB.createRefreshToken({
				token: refreshToken,
				userId: user.getId(),
				device: input.device
			});

			return {
				accessToken: accessToken,
				refreshToken: refreshToken
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during login'
			};
		}
	}
}

export interface LoginUCInput {
	email: string;
	password: string;
	device: string;
}

export interface LoginUCOutput {
	accessToken: string;
	refreshToken: string;
}
