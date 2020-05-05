import { JWTAutenticationGateway } from '../../gateways/JwtAutenticationGateway';
import { ValidatorsGateway } from '../../gateways/ValidatorsGateway';
import { ReactionGateway } from '../../gateways/ReactionGateway';
import { Reaction } from '../../entities/Reaction';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class GetUserReactionByVideoUC {
	constructor(
		private db: ReactionGateway,
		private jwtAuth: JWTAutenticationGateway,
		private validators: ValidatorsGateway
	) {}

	public async execute(input: GetUserReactionByVideoUCInput): Promise<GetUserReactionByVideoUCOutput> {
		try {
			this.validators.validateGetUserReactionInput(input);

      const userInfo = this.jwtAuth.verifyToken(input.token)

      if(!userInfo.userId) {
        throw new ForbiddenError('Unauthorized')
      }

      const userReaction = await this.db.verifyReaction(input.videoId, userInfo.userId)

			if(!userReaction) {
				return {
					userReaction: 'unreacted'
				}
			}

			return {
				userReaction: userReaction
			};
		} catch(err) {
			throw {
				code: err.statusCode || 401,
				message: err.message || 'An error occurred during the getting videos of user'
			};
		}
	}
}

export interface GetUserReactionByVideoUCInput {
	token: string;
	videoId: string;
}

export interface GetUserReactionByVideoUCOutput {
	userReaction: Reaction | string;
}