import {
    TypifiedResponse,
    BoardCreationResultResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    CardModel,
} from "../../index";

export class CreateCardService {

    public async createCardByBoardId(card: CardModel, boardId: string): Promise<TypifiedResponse<BoardCreationResultResponse>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn =  this.getAbsoluteUrn(boardId);

        return await new Request(absoluteUrn)
            .method("POST")
            .auth(loginResponse.token)
            .body(card)
            .send();
    }

    public async createCardByBoardIdWithoutToken(card: CardModel, boardId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrn = this.getAbsoluteUrn(boardId);

        return await new Request(absoluteUrn)
            .method("POST")
            .body(card)
            .send();
    }

    private getAbsoluteUrn(boardId: string): string {
        return `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_LIST_URN}/${process.env.LIST_ID_DEFAULT}${process.env.WEKAN_CARDS_URN}`;
    }
}