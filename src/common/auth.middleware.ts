import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	private secret: string;

	constructor(secret: string) {
		this.secret = secret;
	}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			jwt.verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && isJwtPayload(payload)) {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}

function isJwtPayload(payload: any): payload is JwtPayload {
	return (
		typeof payload === 'object' &&
		payload !== null &&
		typeof payload.sub === 'string' &&
		typeof payload.exp === 'number'
	);
}
