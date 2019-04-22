import {
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    UserLoggedInfoResponse, SchemaJson
} from "../../index"
import {BaseService} from "../baseService";

export class GetLoggedUserInfoService extends BaseService{

    public async getUserInfoByToken(token: string): Promise<TypifiedResponse<UserLoggedInfoResponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getUserInfoByTokenIncorrectly(token: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .auth(token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }

    public async getUserInfoWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }
}