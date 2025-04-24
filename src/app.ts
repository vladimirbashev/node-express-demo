import express, {type Express} from "express";
import {userRouter} from "./users/users.js";
import type {Server} from "http";


export class App {
    app: Express;
    port: number;
    server: Server;

    constructor() {
        this.app = express();
        this.port = 9000;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
}
