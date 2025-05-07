import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service.js";
import {UserController} from "./users/users.controller.js";
import {ExeptionFilter} from "./errors/exeptionFilter.ts";
import { Container, ContainerModule  } from 'inversify';
import {TYPES} from "./types.ts";
import {ILoggerService} from "./logger/logger.interface.ts";
import {IExceptionFilter} from "./errors/exception.filter.interface.ts";
import {IUserController} from "./users/users.controller.interface.ts";

export const appBindings = new ContainerModule((load) => {
    load.bind<ILoggerService>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    load.bind<IExceptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
    load.bind<IUserController>(TYPES.UserController).to(UserController);
    // load.bind<iUserService>(TYPES.UserService).to(UserService);
    // load.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    // load.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    // load.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    load.bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
    // const logger = new LoggerService()
    // const app = new App(logger, new UserController(logger), new ExceptionFilter(logger));

    const appContainer = new Container();
    await appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
}


bootstrap();
