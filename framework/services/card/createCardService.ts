import {
    TypifiedResponse,
    LoginService,
    Request,
    CardModel,
    CardCreationResultResponse,
    SchemaJson,
} from "../../index";
import {ConsoleLogger} from "../../../loggers";
import {BaseService} from "../baseService";

export class CreateCardService extends BaseService{

    public async createCardByBoardId(card: CardModel, boardId: string): Promise<TypifiedResponse<CardCreationResultResponse>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn = this.getAbsoluteUrn(boardId);

        return await new Request(absoluteUrn)
            .method("POST")
            .auth(loginResponse.token)
            .body(card)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.CreateCard));
    }

    public async createCardByBoardIdWithoutToken(card: CardModel, boardId: string): Promise<TypifiedResponse<string>> {
        let absoluteUrn = this.getAbsoluteUrn(boardId);

        try {
            await new Request(absoluteUrn)
                .method("POST")
                .body(card)
                .send();
        } catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }

    private getAbsoluteUrn(boardId: string): string {
        return `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_LIST_URN}/${process.env.LIST_ID_DEFAULT}${process.env.WEKAN_CARDS_URN}`;
    }
}