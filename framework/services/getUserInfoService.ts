import {LoginService, Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ErrorResponse, ForbidderErrorReponse, UserInfoResponse} from "../models";
import {ConsoleLogger} from "../../loggers";

export class GetUserInfoService {

    public async getUserInfo(userId): Promise<TypifiedResponse<UserInfoResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let token = await new LoginService().getAdminToken();

        return await new Request(absoluteUrl)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getUserInfoInvalid(userId): Promise<TypifiedResponse<ErrorResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let token = await new LoginService().getAdminToken();

        try {
            await new Request(absoluteUrl)
                .method("GET")
                .auth(token)
                .send();
        }
        catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
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