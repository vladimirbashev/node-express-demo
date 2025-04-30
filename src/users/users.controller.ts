import {BaseController} from "../common/base.controller.js";
import type {LoggerService} from "../logger/logger.service.js";
import type {NextFunction, Request, Response} from "express";

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: '/login', func: this.login, method: 'post' },
            { path: '/register', func: this.register, method: 'post' },
            { path: '', func: this.root, method: 'get' }
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login')
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }

    root(req: Request, res: Response, next: NextFunction) {
        this.send(res, 200, {
            users: [
                {id: 1, loginname: 'admin'}
            ]
        })
    }
}
