import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { GetUserReactionByVideoUC } from '../../../business/usecases/reaction/GetUserReactionByVideo';
import { ReactionDatabase } from '../../../data/ReactionDatabase';


export const getUserReactionByVideoEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new GetUserReactionByVideoUC(new ReactionDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			videoId: req.params ? req.params.videoId as string : ''
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};