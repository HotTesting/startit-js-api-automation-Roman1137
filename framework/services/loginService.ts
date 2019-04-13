import {UserModel} from "../models/request/userModel";
import {UserAuthResultResponse} from "../models/response/userAuthResultResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {Request, User} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ConsoleLogger} from "../../loggers";

export class LoginService {

    public async loginValid(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_LOGIN_URN)
            .method("POST")
            .body({ email: user.email, password: user.password })
            .send();
    }

    public async loginInValid(user: UserModel): Promise<TypifiedResponse<ErrorResponse>> {
        try {
            await new Request(process.env.WEKAN_REGISTRATION_URN)
                .method("POST")
                .body({ email: user.email, password: user.password })
                .send();
        }
        catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }

    public async getAdminToken(): Promise<string> {
        let result = await this.loginValid(User.Admin);

        return Promise.resolve(result.body.token);
    }

    public async getDefaultUserToken(): Promise<string> {
        let result = await this.loginValid(User.Default);

        return Promise.resolve(result.body.token);
    }
}