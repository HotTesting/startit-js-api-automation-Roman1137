import {TypifiedResponse} from "../requestBuilder";
import {expect} from "../../tests";

export class BaseService {

    public validateWithJsonSchema<T>(response: TypifiedResponse<T>, schemaPath: string) {
        let schema = require(`../../framework/jsonSchemas/${schemaPath}.json`);
        expect(response.body).to.be.jsonSchema(schema);

        return response;
    }
}