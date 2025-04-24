import express, {type Express} from "express";
import {userRouter} from "./users/users.js";
import type {Server} from "http";
import type {LoggerService} from "./logger/logger.service.js";


export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server started on port ${this.port}`);
        });
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
}
