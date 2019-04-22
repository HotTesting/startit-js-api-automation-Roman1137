import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    UserInfoResponse,
    SchemaJson,
} from "../../index"
import {BaseService} from "../baseService";

export class GetUserInfoService extends BaseService {

    public async getUserInfo(userId): Promise<TypifiedResponse<UserInfoResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(absoluteUrl)
            .method("GET")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetUserInfo));
    }

    public async getUserInfoUsingSpecificToken(userId: string, token: string,): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getUserInfoWithoutToken(userId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("GET")
            .send();
    }
}