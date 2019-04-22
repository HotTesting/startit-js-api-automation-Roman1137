import {
    TypifiedResponse,
    LoginService,
    Request,
    GetBoardResponseModel,
    SchemaJson,
} from "../../index";
import {BaseService} from "../baseService";

export class GetAllBoardsService extends BaseService{

    public async getAllBoards(): Promise<TypifiedResponse<Array<GetBoardResponseModel>>> {
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(process.env.WEKAN_BOARDS_URN)
            .method("GET")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetAllBoards));
    }
}