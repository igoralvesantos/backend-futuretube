import { v4 } from 'uuid';
import { User } from '../../entities/User';
import { UserGateway } from '../../gateways/UserGateway';
import { BcryptGateway } from '../../gateways/BcryptGateway';
import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { ConflictError } from '../../errors/ConflictError';
import moment from 'moment';
import 'moment/locale/pt-br';
import { RefreshTokenGateway } from '../../gateways/RefreshTokenGateway';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../../services/JWTAutentication';

export class SignupUC {
	constructor(
		private db: UserGateway,
		private jwtAuth: JWTAutenticationGateway,
		private bcrypt: BcryptGateway,
		private validators: ValidatorsGateway,
		private refreshTokenDB: RefreshTokenGateway
	) {}

	public async execute(input: SignupUCInput): Promise<SignupUCOutput | undefined> {
		try {
			const id = v4();

			this.validators.validateSignupInput(input);

			const user = await this.db.getUserByEmail(input.email);

			if(user) {
				throw new ConflictError('User already registered');
			}

			const hashPassword = await this.bcrypt.generateHash(input.password);

			const newUser = new User(
				id,
				input.name,
				input.email,
				hashPassword,
				moment(input.birthDate, 'L').locale('pt-br').format(),
				input.picture
			);

			await this.db.createUser(newUser);

			const accessToken = this.jwtAuth.generateToken(
				{ userId: id }, ACCESS_TOKEN_EXPIRES
			);

			const refreshToken = this.jwtAuth.generateToken(
				{ userId: id, userDevice: input.device }, REFRESH_TOKEN_EXPIRES
			);

			await this.refreshTokenDB.createRefreshToken({
				token: refreshToken,
				userId: id,
				device: input.device
			});

			return {
				accessToken: accessToken,
				refreshToken: refreshToken
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the user creation'
			};
		}
	}
}

export interface SignupUCInput {
	name: string;
	email: string;
	password: string;
	birthDate: string;
	picture: string;
	device: string;
}

export interface SignupUCOutput {
	accessToken: string;
	refreshToken: string;
}
