import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { NotFoundError } from '../../errors/NotFoundError';

export class UpdateVideoUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: UpdateVideoUCInput): Promise<UpdateVideoUCOutput | undefined> {
		try {
			this.validators.validateUpdateVideoInput(input);

			this.jwtAuth.verifyToken(input.token);

			const video = await this.db.getVideoDetails(input.videoId)

			if(!video) {
				throw new NotFoundError('This video not exist')
			}

			if(input.title) {
				this.db.updateTitle(input.title, input.videoId);
			}

			if(input.description) {
				this.db.updateDescription(input.description, input.videoId);
			}

			return {
				message: 'Video successfully updated'
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the updating video'
			};
		}
	}
}

export interface UpdateVideoUCInput {
	token: string;
	videoId: string;
	title: string;
	description: string;
}

export interface UpdateVideoUCOutput {
	message: string;
}
