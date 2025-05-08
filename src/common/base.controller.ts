import {Router} from "express";
import type {iControllerRoute} from "./route.interface.js";
import type {Response} from "express";
import {injectable} from "inversify";
import {ILoggerService} from "../logger/logger.interface.ts";

@injectable()
export abstract class BaseController{
    public path: string;
    private logger: ILoggerService;
    private readonly _router: Router;

    protected constructor(logger: ILoggerService) {
        this.logger = logger;
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type("application/json");
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T) {
        return this.send(res, 200, message);
    }

    protected bindRoutes(routes: iControllerRoute[]): void {
        routes.forEach(route => {
            this.logger.log(`[${route.method}] ${route.path}`);
            this.router[route.method](route.path, route.func.bind(this));
        });
    }
}
