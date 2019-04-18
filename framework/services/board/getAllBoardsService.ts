import {
    TypifiedResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    GetBoardResponseModel,
} from "../../index";

export class GetAllBoardsService {

    public async getAllBoards(): Promise<TypifiedResponse<Array<GetBoardResponseModel>>> {
        let token = await new LoginService().getAdminToken();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("GET")
            .auth(token)
            .send();
    }

    public async getAllBoardsWithoutToken(): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("GET")
            .send();
    }
}