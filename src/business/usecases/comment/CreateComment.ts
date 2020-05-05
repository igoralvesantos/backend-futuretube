import { v4 } from 'uuid';
import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { VideoGateway } from '../../gateways/VideoGateway';
import { UserGateway } from '../../gateways/UserGateway';
import { CommentGateway } from '../../gateways/CommentGateway';
import { Comment } from '../../entities/Comment';
import { NotFoundError } from '../../errors/NotFoundError';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class CreateCommentUC {
	constructor(
    private commentDB: CommentGateway,
    private userDB: UserGateway,
    private videoDB: VideoGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: CreateCommentUCInput): Promise<CreateCommentUCOutput | undefined> {
		try {
			const id = v4();

			this.validators.validateCreateCommentInput(input);

			const tokenInfo = this.jwtAuth.verifyToken(input.token);
			
      if(!tokenInfo.userId) {
        throw new ForbiddenError('Unauthorized')
      }

      const video = await this.videoDB.getVideoDetails(input.videoId)

      if(!video) {
        throw new NotFoundError('This video not exist')
      }
      
      const user = await this.userDB.getUserById(tokenInfo.userId)

      if(!user) {
        throw new NotFoundError('This user not exist')
      }

			const creationMoment = moment().toISOString();

			const newComment = new Comment(
				id,
				input.message,
				creationMoment,
        user.getId(),
        user.getName(),
        user.getPicture(), 
        input.videoId
			);

			await this.commentDB.createComment(newComment);

			return {
				message: 'Comment successfully created'
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the comment creation'
			};
		}
	}
}

export interface CreateCommentUCInput {
	token: string;
  message: string;
  videoId: string;
}

export interface CreateCommentUCOutput {
	message: string;
}
