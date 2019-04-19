import {
    TypifiedResponse,
    BoardCreationResultResponse,
    LoginService,
    Request,
    ForbidderErrorReponse
} from "../../index";

export class RetrieveCardService {

    public async createAllCardsFromBoardBySwimlaneId(boardId: string, swimlaneId: string): Promise<TypifiedResponse<BoardCreationResultResponse>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn =  this.getAbsoluteUrn(boardId, swimlaneId);

        return await new Request(absoluteUrn)
            .method("GET")
            .auth(loginResponse.token)
            .send();
    }

    public async createAllCardsFromBoardBySwimlaneIdWithoutToken(boardId: string, swimlaneId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrn =  this.getAbsoluteUrn(boardId, swimlaneId);

        return await new Request(absoluteUrn)
            .method("GET")
            .send();
    }

    private getAbsoluteUrn(boardId: string, swimlaneId: string): string {
        return `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}/${swimlaneId}${process.env.WEKAN_CARDS_URN}`;
    }
}