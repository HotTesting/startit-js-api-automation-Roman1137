import {LoginService, Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ErrorResponse, ForbidderErrorReponse, UserLoggedInfoResponse} from "../models";

export class GetLoggedUserInfoService {

    public async getUserInfoByToken(token: string): Promise<TypifiedResponse<UserLoggedInfoResponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getUserInfoWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .send();
    }
}