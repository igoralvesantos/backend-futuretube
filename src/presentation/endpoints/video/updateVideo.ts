import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { UpdateVideoUC } from '../../../business/usecases/video/UpdateVideo';

export const updateVideoEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new UpdateVideoUC(new VideoDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			videoId: req.body.videoId,
			title: req.body.title,
			description: req.body.description
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};
