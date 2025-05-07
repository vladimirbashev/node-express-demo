import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import express, {type Express} from "express";
import type {Server} from "http";
import type {BaseController} from "./common/base.controller.js";
import type {ILoggerService} from "./logger/logger.interface.js";
import type {IExceptionFilter} from "./errors/exception.filter.interface.js";
import { UserController } from './users/users.controller';
import 'reflect-metadata'

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

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server started on port ${this.port}`);
        });
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    useRoutes() {
        this.useRoute(this.userController);
    }

    useRoute(controller: BaseController) {
        this.app.use(`/${controller.path}`, controller.router);
    }
}
