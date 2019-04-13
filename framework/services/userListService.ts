import {LoginService, Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {UsersListResponse, ForbidderErrorReponse} from "../models";

export class UserListService {

    public async getAllUsersInfo(): Promise<TypifiedResponse<UsersListResponse>> {
        let token = await new LoginService().getAdminToken();

        return await new Request(process.env.WEKAN_USERS_URN)
            .method("GET")
            .auth(token)
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