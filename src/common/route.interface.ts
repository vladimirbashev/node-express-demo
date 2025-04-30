import type {Response, Request, NextFunction, Router} from "express";

export interface iControllerRoute {
    path: string;
    func: (req: Request, resp: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>
}
