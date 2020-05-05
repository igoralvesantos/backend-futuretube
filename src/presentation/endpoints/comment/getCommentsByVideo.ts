import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { CommentDatabase } from '../../../data/CommentDatabase';
import { GetCommentsByVideoUC } from '../../../business/usecases/comment/getCommentsByVideo';


export const getCommentsByVideoEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new GetCommentsByVideoUC(new CommentDatabase(), new VideoDatabase(), new JWTAutentication(), new Validators());

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