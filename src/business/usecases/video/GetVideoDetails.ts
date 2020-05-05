import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { VideoWithUser } from '../../entities/Video';
import { NotFoundError } from '../../errors/NotFoundError';

export class GetVideoDetailsUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: GetVideoDetailsUCInput): Promise<GetVideoDetailsUCOutput | undefined> {
		try {
			this.validators.validateGetVideoDetailsInput(input);

			this.jwtAuth.verifyToken(input.token);

			const videoDetails = await this.db.getVideoDetails(input.videoId);

			if(!videoDetails) {
				throw new NotFoundError('Video not found');
			}

			return {
				videoDetails: videoDetails
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the getting video details'
			};
		}
	}
}

export interface GetVideoDetailsUCInput {
	token: string;
	videoId: string;
}

export interface GetVideoDetailsUCOutput {
	videoDetails: VideoWithUser;
}
