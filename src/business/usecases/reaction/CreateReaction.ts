import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { ReactionDatabase } from '../../../data/ReactionDatabase';
import { VideoGateway } from '../../gateways/VideoGateway';
import { NotFoundError } from '../../errors/NotFoundError';
import { UserDatabase } from '../../../data/UserDatabase';
import { TypeOfReaction } from '../../entities/Reaction';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class CreateReactionUC {
	constructor(
		private reactionDB: ReactionDatabase,
		private videosDB: VideoGateway,
		private userDB: UserDatabase,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: CreateReactionUCInput): Promise<CreateReactionUCOutput> {
		try {
      this.validators.validateReactVideoInput(input)

			const userInfo = this.jwtAuth.verifyToken(input.token);
			
			if(!userInfo.userId) {
				throw new ForbiddenError('Unautorized')
			}

			const user = await this.userDB.getUserById(userInfo.userId)

			if(!user) {
				throw new NotFoundError('User not exist')
			}

			const video = await this.videosDB.getVideoDetails(input.videoId)

			if(!video) {
				throw new NotFoundError('Video not exist')
			}

			const alreadyReact = await this.reactionDB.verifyReaction(input.videoId, userInfo.userId)
		
			if(alreadyReact) {
				const lastReaction = alreadyReact.getType()

				if(lastReaction === input.reaction) {
					await this.reactionDB.removeReactVideo(input.videoId, userInfo.userId)
				}

				await this.reactionDB.updateReactVideo(input.videoId, userInfo.userId, input.reaction)
			}

			if(!alreadyReact) {
				await this.reactionDB.reactVideo(input.videoId, userInfo.userId, input.reaction)
			}

			return {
				message: "Reacted this video successfully"
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred while trying to react this video'
			};
		}
	}
}

export interface CreateReactionUCInput {
	token: string;
	videoId: string;
	reaction: TypeOfReaction;
}

export interface CreateReactionUCOutput {
	message: string;
}