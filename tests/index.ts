import {ConsoleLogger} from "../loggers/";
import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));

before(() => ConsoleLogger.info(`Mocha Test Started at '${process.env.NODE_ENV}' environment with '${process.env.LOGGING_LEVEL}' logging level`));

after(() => ConsoleLogger.info("Mocha Test Finished"));

export const expect = chai.expect;
export * from "../loggers";
export * from "../framework";