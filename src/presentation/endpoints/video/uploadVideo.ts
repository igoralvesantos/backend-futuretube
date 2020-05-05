import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { UploadVideoUC } from '../../../business/usecases/video/UploadVideo';
import { VideoDatabase } from '../../../data/VideoDatabase';

export const uploadVideoEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new UploadVideoUC(new VideoDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			url: req.body.url,
			thumbnail: req.body.thumbnail,
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
