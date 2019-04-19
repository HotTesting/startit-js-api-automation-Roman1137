import {
    TypifiedResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    SwimLaneCreationResponseModel,
    SwimlaneModel
} from "../../index";

export class CreateSwimlaneService {

    public async createSwimlaneByBoardId(swimlane: SwimlaneModel, boardId: string): Promise<TypifiedResponse<SwimLaneCreationResponseModel>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("POST")
            .auth(loginResponse.token)
            .body(swimlane)
            .send();
    }

    public async createSwimlaneByBoardIdWithoutToken(swimlane: SwimlaneModel, boardId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("POST")
            .body(swimlane)
            .send();
    }
}