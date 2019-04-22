import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    UserInfo,
    SchemaJson
} from "../../index"
import {BaseService} from "../baseService";

export class UserListService extends BaseService {

    public async getAllUsersInfo(): Promise<TypifiedResponse<Array<UserInfo>>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetUserList));
    }

    public async getAllUsersInfoUsingSpecificToken(token: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .auth(token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }

    public async getAllUsersInfoWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }
}