import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';

export class DeleteVideoUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: DeleteVideoUCInput): Promise<DeleteVideoUCOutput | undefined> {
		try {
			this.validators.validateDeleteVideoInput(input);

			this.jwtAuth.verifyToken(input.token);

			this.db.deleteVideo(input.videoId);

			return {
				message: 'Video successfully deleted'
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred while trying to delete the video'
			};
		}
	}
}

export interface DeleteVideoUCInput {
	token: string;
	videoId: string;
}

export interface DeleteVideoUCOutput {
	message: string;
}
