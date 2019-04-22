import {
    UserAuthResultResponse,
    UserModel,
    ErrorResponse,
    Request,
    User,
    TypifiedResponse, SchemaJson
} from "../../index";
import {ConsoleLogger} from "../../../loggers";
import {BaseService} from "../baseService";

export class LoginService extends BaseService{

    public async login(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_LOGIN_URN)
            .method("POST")
            .body({ email: user.email, password: user.password })
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetAuth));
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
            return this.validateWithJsonSchema(error.response, SchemaJson.Error);
        }
    }

    public async loginAsAdmin(): Promise<UserAuthResultResponse> {
        let result = await this.login(User.Admin);

        return Promise.resolve(result.body);
    }

    public async loginAsDefaultUser(): Promise<UserAuthResultResponse> {
        let result = await this.login(User.Default);

        return Promise.resolve(result.body);
    }
}