import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { Video } from '../../entities/Video';

export class GetUserVideosUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: GetUserVideosUCInput): Promise<GetUserVideosUCOutput> {
		try {
			this.validators.validateGetUserVideoInput(input);

			let userVideos: Video[];

			if(input.id) {
				userVideos = await this.db.getUserVideos(input.id);
			} else {
				const userInfo = this.jwtAuth.verifyToken(input.token);
				userVideos = await this.db.getUserVideos(userInfo.userId);
			}

			return {
				userVideos: userVideos
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the getting videos of user'
			};
		}
	}
}

export interface GetUserVideosUCInput {
	token: string;
	id?: string;
}

export interface GetUserVideosUCOutput {
	userVideos: Video[];
}
