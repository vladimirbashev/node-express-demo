import {BaseController} from "../common/base.controller.js";
import type {LoggerService} from "../logger/logger.service.js";
import type {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class.js";

export class UserController extends BaseController {
    path = 'users';
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: '/login', func: this.login, method: 'post' },
            { path: '/register', func: this.register, method: 'post' },
            { path: '/error', func: this.error, method: 'get' },
            { path: '', func: this.root, method: 'get' }
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login')
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }

    error(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(500, 'Test Error', this.path))
    }

    root(req: Request, res: Response, next: NextFunction) {
        this.send(res, 200, {
            users: [
                {id: 1, loginname: 'admin'}
            ]
        })
    }
}
