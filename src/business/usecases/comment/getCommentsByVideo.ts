import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { CommentGateway } from '../../gateways/CommentGateway';
import { NotFoundError } from '../../errors/NotFoundError';
import { Comment } from '../../entities/Comment';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class GetCommentsByVideoUC {
	constructor(
    private commentDB: CommentGateway,
    private videoDB: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: GetCommentByVideoUCInput): Promise<GetCommentByVideoUCOutput | undefined> {
		try {
			this.validators.validateGetCommentByVideoInput(input);

      const tokenInfo = this.jwtAuth.verifyToken(input.token);

      if(!tokenInfo.userId) {
        throw new ForbiddenError('Unauthorized')
      }

      const video = await this.videoDB.getVideoDetails(input.videoId)

      if(!video) {
        throw new NotFoundError('This video not exist')
      }
      
      const commentsVideo = await this.commentDB.getCommentsByVideo(input.videoId)

			return {
				commentsVideo: commentsVideo
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the comment creation'
			};
		}
	}
}

export interface GetCommentByVideoUCInput {
	token: string;
  videoId: string;
}

export interface GetCommentByVideoUCOutput {
	commentsVideo: Comment[];
}