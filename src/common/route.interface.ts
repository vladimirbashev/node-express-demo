import type {Response, Request, NextFunction, Router} from "express";
import {IMiddleware} from "./middleware.interface.ts";

export interface IControllerRoute {
    path: string;
    func: (req: Request, resp: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>
    middlewares?: IMiddleware[];
}
