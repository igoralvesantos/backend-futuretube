import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { UserDatabase } from '../../../data/UserDatabase';
import { CreateReactionUC } from '../../../business/usecases/reaction/CreateReaction';
import { ReactionDatabase } from '../../../data/ReactionDatabase';

export const createReactionEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new CreateReactionUC(
			new ReactionDatabase(), 
			new VideoDatabase(),
			new UserDatabase(),
      new JWTAutentication(), 
      new Validators()
    );

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			videoId: req.body.videoId as string,
			reaction: req.body.reaction 
		});

		res.status(200).send(result);
	} catch (err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};
