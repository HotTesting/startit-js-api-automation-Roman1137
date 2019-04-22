import {
    TypifiedResponse,
    BoardCreationResultResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    BoardModel,
    SchemaJson,
} from "../../index";
import {BaseService} from "../baseService";

export class CreateBoardService extends BaseService{

    public async createBoard(board: BoardModel): Promise<TypifiedResponse<BoardCreationResultResponse>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .auth(loginResponse.token)
            .body(board)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.CreateBoard));
    }

    public async createBoardWithoutToken(board: BoardModel): Promise<TypifiedResponse<ForbidderErrorReponse>> {

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("POST")
            .body(board)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }
}