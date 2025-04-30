import express, {type Express} from "express";
import type {Server} from "http";
import type {LoggerService} from "./logger/logger.service.js";
import type {BaseController} from "./common/base.controller.js";
import type {ExceptionFilter} from "./errors/exception.filter.js";


export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: BaseController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        userController: BaseController,
        exceptionFilter: ExceptionFilter)
    {
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
