import {
    UserAuthResultResponse,
    UserModel,
    ErrorResponse,
    Request,
    User,
    TypifiedResponse
} from "../../index";
import {ConsoleLogger} from "../../../loggers";

export class LoginService {

    public async login(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_LOGIN_URN)
            .method("POST")
            .body({ email: user.email, password: user.password })
            .send();
    }

    public async loginIncorrectly(user: UserModel): Promise<TypifiedResponse<ErrorResponse>> {
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
        let result = await this.login(User.Admin);

        return Promise.resolve(result.body.token);
    }

    public async getDefaultUserToken(): Promise<string> {
        let result = await this.login(User.Default);

        return Promise.resolve(result.body.token);
    }
}