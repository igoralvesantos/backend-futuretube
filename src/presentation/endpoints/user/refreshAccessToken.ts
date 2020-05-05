import { Request, Response } from 'express';
import { RefreshAccessTokenUC } from '../../../business/usecases/user/RefreshAccessToken';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { UserDatabase } from '../../../data/UserDatabase';
import { RefreshTokenDatabase } from '../../../data/RefreshTokenDatabase';


export const refreshAccessTokenEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new RefreshAccessTokenUC(
      new JWTAutentication(),
			new UserDatabase(),
			new RefreshTokenDatabase()
		);

		const result = await uc.execute({
      refreshToken: req.headers.refresh as string
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};