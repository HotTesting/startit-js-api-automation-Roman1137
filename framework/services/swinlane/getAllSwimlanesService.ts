import {
    TypifiedResponse,
    LoginService,
    Request,
    GetSwimlaneResponseModel,
} from "../../index";

export class GetAllSwimlanesService {

    public async getAllSwimlanesByBoardId(boardId: string): Promise<TypifiedResponse<Array<GetSwimlaneResponseModel>>> {
        let token = await new LoginService().getAdminToken();
        let absoluteUrn = `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}`;

        return await new Request(absoluteUrn)
            .method("GET")
            .auth(token)
            .send();
    }
}