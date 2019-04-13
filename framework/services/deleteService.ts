import {LoginService, Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ForbidderErrorReponse} from "../models";
import {DeletedUserResponse} from "../models/response/deletedUserResponse";
import {ConsoleLogger} from "../../loggers";

export class DeleteService {

    public async deleteUser(userId): Promise<TypifiedResponse<DeletedUserResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_LIST_URN}/${userId}`;
        let token = await new LoginService().getAdminToken();

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(token)
            .send();
    }

    public async deleteUserInvalid(userId): Promise<TypifiedResponse<DeletedUserResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_LIST_URN}/${userId}`;
        let token = await new LoginService().getAdminToken();

        try {
            await new Request(absoluteUrl)
                .method("DELETE")
                .auth(token)
                .send();
        }
        catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }

    public async deleteUserUsingSpecificToken(userId: string, token: string,): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_LIST_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(token)
            .send();
    }

    public async deleteUserWithoutToken(userId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_LIST_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .send();
    }
}