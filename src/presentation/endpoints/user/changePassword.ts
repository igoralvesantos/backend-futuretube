import { Request, Response } from 'express';
import { UserDatabase } from '../../../data/UserDatabase';
import { BcryptPassword } from '../../../business/services/Bcrypt';
import { JWTAutentication } from '../../../business/services/JWTAutentication';
import { ChangePasswordUC } from '../../../business/usecases/user/ChangePassword';
import { Validators } from '../../../business/services/Validators';

export const changePasswordEndpoint = async (req: Request, res: Response) => {
	try {
		const uc = new ChangePasswordUC(
			new UserDatabase(),
			new BcryptPassword(),
			new JWTAutentication(),
			new Validators()
		);

		const result = await uc.execute({
			token: (req.headers.Authorization || req.headers.authorization) as string,
			oldPassword: req.body.oldPassword,
			newPassword: req.body.newPassword
		});

		res.status(200).send(result);
	} catch(err) {
		res.status(err.code || 400).send({
			message: err.message,
			...err
		});
	}
};
