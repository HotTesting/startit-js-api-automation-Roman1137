import {LoginService, Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ConsoleLogger} from "../../loggers";
import {UsersListResponse, ErrorResponse, ForbidderErrorReponse} from "../models";

export class UserListService {

    public async getAllUsersInfo(): Promise<TypifiedResponse<UsersListResponse>> {
        let token = await new LoginService().getAdminToken();

        return await new Request(process.env.WEKAN_USERS_LIST_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getAllUsersInfoByToken(token: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_LIST_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getAllUsersInfoWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        return await new Request(process.env.WEKAN_USERS_LIST_URN)
            .method("GET")
            .send();
    }
}