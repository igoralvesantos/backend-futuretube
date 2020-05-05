import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { DeleteVideoUC } from '../../../business/usecases/video/DeleteVideo';

export const deleteVideoEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new DeleteVideoUC(new VideoDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
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
