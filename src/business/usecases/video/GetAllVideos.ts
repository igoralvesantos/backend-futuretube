import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { VideoWithUser } from '../../entities/Video';

export class GetAllVideosUC {
	constructor(
		private db: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	private POSTS_PER_PAGE = 12;

	public async execute(input: GetAllVideosUCInput): Promise<GetAllVideosUCOutput | undefined> {
		try {
			this.validators.validateGetAllVideosInput(input);

			this.jwtAuth.verifyToken(input.token);

			let page = Number(input.page) >= 1 ? Number(input.page) : 1;

			const offset = this.POSTS_PER_PAGE * (page - 1);

			const allVideos = await this.db.getAllVideos(this.POSTS_PER_PAGE, offset);

			return {
				allVideos: allVideos
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the getting all the videos'
			};
		}
	}
}

export interface GetAllVideosUCInput {
	token: string;
	page: string;
}

export interface GetAllVideosUCOutput {
	allVideos: VideoWithUser[];
}
