import {
    TypifiedResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    SwimLaneCreationResponseModel,
    SwimlaneModel,
    SchemaJson
} from "../../index";
import {BaseService} from "../baseService";

export class CreateSwimlaneService extends BaseService{

    public async createSwimlaneByBoardId(swimlane: SwimlaneModel, boardId: string): Promise<TypifiedResponse<SwimLaneCreationResponseModel>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("POST")
            .auth(loginResponse.token)
            .body(swimlane)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.CreateSwimlane));
    }

    public async createSwimlaneByBoardIdWithoutToken(swimlane: SwimlaneModel, boardId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("POST")
            .body(swimlane)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }
}