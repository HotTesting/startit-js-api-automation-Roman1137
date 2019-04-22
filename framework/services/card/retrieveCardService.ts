import {
    TypifiedResponse,
    LoginService,
    Request,
    ForbidderErrorReponse,
    GetCardByIdResponseModel, SchemaJson
} from "../../index";
import {ConsoleLogger} from "../../../loggers";
import {BaseService} from "../baseService";

export class RetrieveCardService extends BaseService{

    public async retrieveAllCardsFromBoardBySwimlaneId(boardId: string, swimlaneId: string): Promise<TypifiedResponse<Array<GetCardByIdResponseModel>>> {
        let loginResponse = await new LoginService().loginAsAdmin();
        let absoluteUrn =  this.getAbsoluteUrn(boardId, swimlaneId);

        return await new Request(absoluteUrn)
            .method("GET")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.GetCardById));
    }

    public async retrieveAllCardsFromBoardBySwimlaneIdWithoutToken(boardId: string, swimlaneId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrn =  this.getAbsoluteUrn(boardId, swimlaneId);

        try {
            await new Request(absoluteUrn)
                .method("GET")
                .send();
        } catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }

    private getAbsoluteUrn(boardId: string, swimlaneId: string): string {
        return `${process.env.WEKAN_BOARDS_URN}/${boardId}${process.env.WEKAN_SWIMLANES_URN}/${swimlaneId}${process.env.WEKAN_CARDS_URN}`;
    }
}