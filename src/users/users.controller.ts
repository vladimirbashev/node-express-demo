import {BaseController} from "../common/base.controller.js";
import type {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class.js";
import {inject, injectable} from "inversify";
import { TYPES } from '../types';
import {ILoggerService} from "../logger/logger.interface.ts";
import {IUserController} from "./users.controller.interface.ts";
import {UserLoginDto} from "./dto/user-login.dto.ts";
import {UserRegisterDto} from "./dto/user-register.dto.ts";
import {ValidateMiddleware} from "../common/validate.middleware.ts";
import {IUserService} from "./users.service.interface.ts";
import {IConfigService} from "../config/config.service.interface.ts";
import {AuthGuard} from "../common/auth.guard.ts";
import jwt from 'jsonwebtoken';
import {plainToInstance} from "class-transformer";


@injectable()
export class UserController extends BaseController implements IUserController {
    path = 'users';
    @inject(TYPES.UserService)
    private userService: IUserService;

    @inject(TYPES.ConfigService)
    private configService: IConfigService;

    constructor(@inject(TYPES.ILogger) logger: ILoggerService) {
        super(logger);
        this.bindRoutes([
            { path: '/login', func: this.login, method: 'post', middlewares: [new ValidateMiddleware(UserLoginDto)],},
            { path: '/register', func: this.register, method: 'post', middlewares: [new ValidateMiddleware(UserRegisterDto)],},
            { path: '', func: this.root, method: 'get', middlewares: [new AuthGuard()],},
            {
                path: '/info',
                method: 'get',
                func: this.info,
                middlewares: [new AuthGuard()],
            },
        ]);
    }

    async login(
        req: Request<{}, {}, UserLoginDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.userService.validateUser(req.body);
        if (!result) {
            return next(new HTTPError(401, 'ошибка авторизации', 'login'));
        }
        const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
        this.ok(res, { jwt });
    }

    async register(
        { body }: Request<{}, {}, UserRegisterDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.userService.createUser(body);
        if (!result) {
            return next(new HTTPError(422, 'This user already exists'));
        }
        this.ok(res, { email: result.email, id: result.id });
    }

    async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
        const userInfo = await this.userService.getUserInfo(user);
        this.ok(res, { email: userInfo?.email, id: userInfo?.id });
    }

    async root(req: Request, res: Response, next: NextFunction) {
        const users = await this.userService.getUsers();
        this.send(res, 200, plainToInstance(UserLoginDto, users, {
            excludeExtraneousValues: true,
        }));
    }

    private signJWT(email: string, secret: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(
                {
                    email,
                    iat: Math.floor(Date.now() / 1000),
                },
                secret,
                {
                    algorithm: 'HS256',
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token as string);
                },
            );
        });
    }
}
