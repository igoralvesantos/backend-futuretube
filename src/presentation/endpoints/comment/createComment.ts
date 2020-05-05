import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { CreateCommentUC } from '../../../business/usecases/comment/CreateComment';
import { UserDatabase } from '../../../data/UserDatabase';
import { CommentDatabase } from '../../../data/CommentDatabase';


export const createCommentEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new CreateCommentUC(new CommentDatabase(), new UserDatabase(), new VideoDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
      token: (req.headers.Authorization || req.headers.authorization) as string,
      message: req.body.message,
			videoId: req.body.videoId
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};