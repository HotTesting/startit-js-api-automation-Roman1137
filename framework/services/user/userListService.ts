import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    UserInfo
} from "../../index"
import {BaseService} from "../baseService";

export class UserListService extends BaseService{

    public async getAllUsersInfo(): Promise<TypifiedResponse<Array<UserInfo>>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .auth(loginResponse.token)
            .send();
    }

    public async getAllUsersInfoUsingSpecificToken(token: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getAllUsersInfoWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .send();
    }
}