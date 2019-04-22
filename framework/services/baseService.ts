import {TypifiedResponse} from "../requestBuilder";
import {UserInfoResponse} from "../models/response/userRelated";
import {expect} from "../../tests";

export class BaseService {

    public validateWithJsonSchema(response: TypifiedResponse<UserInfoResponse>, schemaName: string) {
        let schema = require(`../../framework/jsonSchemas/${schemaName}.json`);
        expect(response.body).to.be.jsonSchema(schema);

        return response;
    }
}