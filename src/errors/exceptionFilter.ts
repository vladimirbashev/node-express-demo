import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import type {NextFunction, Request, Response} from "express";
import type {IExceptionFilter} from "./exception.filter.interface.js";
import {HTTPError} from "./http-error.class.js";
import {ILoggerService} from "../logger/logger.interface.ts";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
    @inject(TYPES.ILogger)
    logger: ILoggerService;

    public catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.log(`[${err.context}] Error: ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({error: err.message});
        } else {
            this.logger.log(`${err.message}`);
            res.status(500).send({error: err.message});
        }
    }
}
