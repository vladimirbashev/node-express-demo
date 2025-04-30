import type {Response, Request, NextFunction} from "express";

export interface iExceptionFilter {
    catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
