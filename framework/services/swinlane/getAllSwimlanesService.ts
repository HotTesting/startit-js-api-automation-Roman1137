import {
    TypifiedResponse,
    LoginService,
    Request,
    GetSwimlaneResponseModel, SchemaJson,
} from "../../index";
import {BaseService} from "../baseService";

export class GetAllSwimlanesService extends BaseService{

    public async getAllSwimlanesByBoardId(boardId: string): Promise<TypifiedResponse<Array<GetSwimlaneResponseModel>>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("GET")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetSwimlanes));
    }
}