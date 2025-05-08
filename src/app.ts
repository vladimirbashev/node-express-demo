import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import express, {type Express} from "express";
import type {Server} from "http";
import type {BaseController} from "./common/base.controller.js";
import type {ILoggerService} from "./logger/logger.interface.js";
import type {IExceptionFilter} from "./errors/exception.filter.interface.js";
import { UserController } from './users/users.controller';
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    port: number;
    server: Server;
    @inject(TYPES.ILogger)
    logger: ILoggerService;
    @inject(TYPES.UserController)
    userController: UserController;
    @inject(TYPES.ExceptionFilter)
    exceptionFilter: IExceptionFilter;

    constructor() {
        this.app = express();
        this.port = 9000;
    }

    useMiddleware(): void {
        this.app.use(express.json());
        // const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
        // this.app.use(authMiddleware.execute.bind(authMiddleware));
    }

    useRoutes() {
        this.useRoute(this.userController);
    }

    useRoute(controller: BaseController) {
        this.app.use(`/${controller.path}`, controller.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server started on port ${this.port}`);
        });
    }
}
