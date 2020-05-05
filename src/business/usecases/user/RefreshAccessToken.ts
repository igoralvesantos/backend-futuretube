import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { UserGateway } from '../../gateways/UserGateway';
import { NotFoundError } from '../../errors/NotFoundError';
import { RefreshTokenGateway } from '../../gateways/RefreshTokenGateway';
import { ACCESS_TOKEN_EXPIRES } from '../../services/JWTAutentication';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class RefreshAccessTokenUC {
	constructor(
		private jwtAuth: JWTAutenticationGateway,
		private userdb: UserGateway,
		private refreshTokenDB: RefreshTokenGateway
	) {}

	public async execute(input: RefreshAccessTokenUCInput): Promise<RefreshAccessTokenUCOutput> {
		const userInfo = this.jwtAuth.verifyToken(input.refreshToken);

		if(!userInfo.userDevice) {
			throw new ForbiddenError('Refresh token is not valid');
		}

		const user = await this.userdb.getUserById(userInfo.userId);

		if(!user) {
			throw new NotFoundError('User not found');
		}

		const refreshToken = this.refreshTokenDB.getRefreshToken(userInfo.userDevice, user.getId());

		if(!refreshToken) {
			throw new ForbiddenError('Refresh token is not valid');
		}

		const accessToken = this.jwtAuth.generateToken(
      { userId: user.getId() }, 
      ACCESS_TOKEN_EXPIRES
    );

		return {
			accessToken
		};
	}
}

interface RefreshAccessTokenUCInput {
	refreshToken: string;
}

interface RefreshAccessTokenUCOutput {
	accessToken: string;
}
