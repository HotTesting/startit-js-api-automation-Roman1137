import {
    TypifiedResponse,
    Board,
    BoardCreationResultResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
} from "../../index";

export class CreateBoardService {

    public async createBoard(board: Board): Promise<TypifiedResponse<Array<BoardCreationResultResponse>>> {
        let token = await new LoginService().getAdminToken();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .auth(token)
            .body(board)
            .send();
    }

    public async createBoardWithoutToken(board: Board): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .body(board)
            .send();
    }
}