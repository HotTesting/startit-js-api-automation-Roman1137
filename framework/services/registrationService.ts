import {ErrorResponse, UserModel, UserAuthResultResponse} from "../models";
import {Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ConsoleLogger} from "../../loggers";

export class RegistrationService {

    public async registerUser(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_REGISTRATION_URN)
            .method("POST")
            .body(user)
            .send();
    }

    public async registerIncorrectly(user: UserModel): Promise<TypifiedResponse<ErrorResponse>> {
        try {
            await new Request(process.env.WEKAN_REGISTRATION_URN)
                .method("POST")
                .body(user)
                .send();
        }
        catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }
}