import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service.js";
import {UserController} from "./users/users.controller.js";
import {ExceptionFilter} from "./errors/exceptionFilter.ts";
import { Container, ContainerModule  } from 'inversify';
import {TYPES} from "./types.ts";
import {ILoggerService} from "./logger/logger.interface.ts";
import {IExceptionFilter} from "./errors/exception.filter.interface.ts";
import {IUserController} from "./users/users.controller.interface.ts";
import {UserService} from "./users/users.service.ts";
import {ConfigService} from "./config/config.service.ts";
import {UsersRepository} from "./users/users.repository.ts";
import {IUsersRepository} from "./users/users.repository.interface.ts";
import {IConfigService} from "./config/config.service.interface.ts";
import {IUserService} from "./users/users.service.interface.ts";
import {PrismaService} from "./database/prisma.service.ts";

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((load) => {
    load.bind<ILoggerService>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    load.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    load.bind<IUserController>(TYPES.UserController).to(UserController);
    load.bind<IUserService>(TYPES.UserService).to(UserService);
    load.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    load.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    load.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    load.bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
    const appContainer = new Container();
    await appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
    return { appContainer, app };
}

export const boot = bootstrap();
