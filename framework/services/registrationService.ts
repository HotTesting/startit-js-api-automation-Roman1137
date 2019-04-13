import {UserModel} from "../models/request/userModel";
import {UserAuthResultResponse} from "../models/response/userAuthResultResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {Request} from ".."
import {TypifiedResponse} from "../requestBuilder/request";
import {ConsoleLogger} from "../../loggers";

export class RegistrationService {

    public async registerValid(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_REGISTRATION_URN)
            .method("POST")
            .body(user)
            .send();
    }

    public async registerInValid(user: UserModel): Promise<TypifiedResponse<ErrorResponse>> {
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