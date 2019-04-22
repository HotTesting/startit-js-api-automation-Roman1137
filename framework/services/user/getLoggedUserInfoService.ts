import {
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    UserLoggedInfoResponse
} from "../../index"
import {BaseService} from "../baseService";

export class GetLoggedUserInfoService extends BaseService{

    public async getUserInfoByToken(token: string): Promise<TypifiedResponse<UserLoggedInfoResponse>> {

        return await new Request(process.env.WEKAN_USER_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getUserInfoByTokenIncorrectly(token: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {

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