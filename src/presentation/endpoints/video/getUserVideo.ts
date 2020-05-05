import { Request, Response } from 'express';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { VideoDatabase } from '../../../data/VideoDatabase';
import { GetUserVideosUC } from '../../../business/usecases/video/GetUserVideos';


export const getUserVideosEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new GetUserVideosUC(new VideoDatabase(), new JWTAutentication(), new Validators());

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			id: req.query ? req.query.id as string : ''
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};
