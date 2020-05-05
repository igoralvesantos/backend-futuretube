import { v4 } from 'uuid';
import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { Video } from '../../entities/Video';
import moment from 'moment';
import 'moment/locale/pt-br';

export class UploadVideoUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: UploadVideoUCInput): Promise<UploadVideoUCOutput | undefined> {
		try {
			const id = v4();

			this.validators.validateUploadVideoInput(input);

			const userInfo = this.jwtAuth.verifyToken(input.token);

			const creationMoment = moment().toISOString();

			const newVideo = new Video(
				id,
				input.url,
				input.thumbnail,
				input.title,
				input.description,
				creationMoment,
				userInfo.userId
			);

			await this.db.uploadVideo(newVideo);

			return {
				message: 'Video successfully created'
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the video creation'
			};
		}
	}
}

export interface UploadVideoUCInput {
	token: string;
	url: string;
	thumbnail: string;
	title: string;
	description: string;
}

export interface UploadVideoUCOutput {
	message: string;
}
