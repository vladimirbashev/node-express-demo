import express, {type Express} from "express";
import type {Server} from "http";
import type {LoggerService} from "./logger/logger.service.js";
import type {BaseController} from "./common/base.controller.js";


export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: BaseController;

    constructor(logger: LoggerService, userController: BaseController) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
        this.userController = userController;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server started on port ${this.port}`);
        });
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }
}
