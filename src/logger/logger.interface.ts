import type {Logger} from "tslog";

export interface iLoggerService {
    logger: Logger;
    log: (...args: unknown[])  => void;
    error: (...args: unknown[])  => void;
    warn: (...args: unknown[])   => void;
}
