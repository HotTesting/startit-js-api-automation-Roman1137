import {TypifiedResponse} from "../requestBuilder";
import {expect} from "../../tests";

export class BaseService {

    public validateWithJsonSchema<T>(response: TypifiedResponse<T>, schemaName: string) {
        let schema = require(`../../framework/jsonSchemas/${schemaName}.json`);
        expect(response.body).to.be.jsonSchema(schema);

        return response;
    }
}