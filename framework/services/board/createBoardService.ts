import {
    TypifiedResponse,
    BoardCreationResultResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    BoardModel,
} from "../../index";

export class CreateBoardService {

    public async createBoard(board: BoardModel): Promise<TypifiedResponse<BoardCreationResultResponse>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .auth(loginResponse.token)
            .body(board)
            .send();
    }

    public async createBoardWithoutToken(board: BoardModel): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .body(board)
            .send();
    }
}