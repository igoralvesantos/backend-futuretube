import * as jwt from 'jsonwebtoken';
import { JWTAutenticationGateway } from '../gateways/JwtAutenticationGateway';

export class JWTAutentication implements JWTAutenticationGateway {
	generateToken(input: UserInfoForToken, expiresIn: string): string {
		const token = jwt.sign(
			{
				userId: input.userId,
				userDevice: input.userDevice
			},
			process.env.SECRET_KEY as string,
			{
				expiresIn
			}
		);
		return token;
	}

	verifyToken(token: string): UserInfoForToken {
		const result = jwt.verify(token, process.env.SECRET_KEY as string) as UserInfoForToken;

		return {
			userId: result.userId,
			userDevice: result.userDevice
		};
	}
}

export interface UserInfoForToken {
	userId: string;
	userDevice?: string;
}

export const ACCESS_TOKEN_EXPIRES = '15min';
export const REFRESH_TOKEN_EXPIRES = '30d';