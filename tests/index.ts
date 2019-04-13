import {ConsoleLogger} from "../loggers/";

before(() => ConsoleLogger.info(`Mocha Test Started at ${process.env.NODE_ENV} environment`));

after(() => ConsoleLogger.info("Mocha Test Finished"));

export * from "../loggers";
export * from "../framework";