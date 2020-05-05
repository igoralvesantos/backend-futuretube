import { RefreshToken } from '../../data/RefreshTokenDatabase';

export interface RefreshTokenGateway {
	createRefreshToken(input: RefreshToken): Promise<void>;
	getRefreshToken(device: string, userId: string): Promise<RefreshToken | undefined>;
	deleteRefreshToken(device: string, userId: string): Promise<void>;
}
