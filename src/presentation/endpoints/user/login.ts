import { Request, Response } from 'express';
import { LoginUC } from '../../../business/usecases/user/Login';
import { UserDatabase } from '../../../data/UserDatabase';
import { BcryptPassword } from '../../../business/services/Bcrypt';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { Validators } from '../../../business/services/Validators';
import { RefreshTokenDatabase } from '../../../data/RefreshTokenDatabase';

export const loginEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new LoginUC(
			new UserDatabase(),
			new JWTAutentication(),
			new BcryptPassword(),
			new Validators(),
			new RefreshTokenDatabase()
		);

		const result = await uc.execute({
			email: req.body.email,
			password: req.body.password,
			device: req.body.device
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};
