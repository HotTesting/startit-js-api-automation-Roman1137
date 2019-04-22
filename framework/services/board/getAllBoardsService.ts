import {
    TypifiedResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    GetBoardResponseModel,
} from "../../index";
import {BaseService} from "../baseService";

export class GetAllBoardsService extends BaseService{

    public async getAllBoards(): Promise<TypifiedResponse<Array<GetBoardResponseModel>>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("GET")
            .auth(loginResponse.token)
            .send();
    }

    public async getAllBoardsWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("GET")
            .send();
    }
}