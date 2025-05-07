import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import express, {type Express} from "express";
import type {Server} from "http";
import type {BaseController} from "./common/base.controller.js";
import type {ILoggerService} from "./logger/logger.interface.js";
import type {IExceptionFilter} from "./errors/exception.filter.interface.js";
import { UserController } from './users/users.controller';

@injectable()
export class App {
    app: Express;
    port: number;
    server: Server;
    logger: ILoggerService;
    userController: BaseController;
    exceptionFilter: IExceptionFilter;

    constructor(
        @inject(TYPES.ILogger) logger: ILoggerService,
        @inject(TYPES.UserController) userController: UserController,
        @inject(TYPES.ExeptionFilter) exceptionFilter: IExceptionFilter,
        // @inject(TYPES.ConfigService) private configService: IConfigService,
        // @inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
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
