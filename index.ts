import * as dotenv from "dotenv";

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
let path;
switch (process.env.NODE_ENV) {
    case "local":
        path = `${__dirname}/config/.env.local`;
        break;
    case "dev":
        path = `${__dirname}/config/.env.dev`;
        break;
    case "test":
        path = `${__dirname}/config/.env.test`;
        break;
    case "prod":
        path = `${__dirname}/config/.env.production`;
        break;
    default:
        throw new Error("The process.env.NODE_ENV value is invalid and it is impossible to read config file");

}
dotenv.config({ path });

