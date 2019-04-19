import {expect} from "chai";
import {
    Board,
    CreateBoardService,
    CreateSwimlaneService,
    LoginService,
    Swimlane,
    Card,
    CreateCardService, RetrieveCardService
} from "./index";

describe('Get all cards from board by swimlane id', async () => {
    let createBoardService = new CreateBoardService(),
        createCardService = new CreateCardService(),
        createSwimlaneService = new CreateSwimlaneService(),
        retrieveCardsService = new RetrieveCardService(),
        loginService = new LoginService();

    describe('positive cases', async () => {

        it('should display in [all card list] just created valid card', async () => {
            let board = Board.GenerateValid();
            let createBoardResponse = await createBoardService.createBoard(board);

            let swimlane = Swimlane.GenerateValid();
            let boardId = createBoardResponse.body._id;
            let swimlaneId= (await createSwimlaneService.createSwimlaneByBoardId(swimlane, boardId)).body._id;

            let adminId = (await loginService.loginAsAdmin()).id;
            let card = Card.Create()
                .WithTitle()
                .WithDescription()
                .WithAuthorId(adminId)
                .WithSwimlaneId(swimlaneId)
                .build();

            let createCardResponse = await createCardService.createCardByBoardId(card, boardId);

            let getAllCardsResponse = await retrieveCardsService.retrieveAllCardsFromBoardBySwimlaneId(boardId, swimlaneId);

            let createdCard = getAllCardsResponse.body.find(cr => cr._id == createCardResponse.body._id);
            expect(createdCard.description).to.eql(card.description);
            expect(createdCard.listId).to.eql(process.env.LIST_ID_DEFAULT);
            expect(createdCard.title).to.eql(card.title);
        });
    });

    describe('negative cases', async () => {

        it('should return error without admin token', async () => {
            let boardId = "someBoardId";
            let swimlaneId = "someSwimlaneId";

            let getAllCardsResponse = await retrieveCardsService.retrieveAllCardsFromBoardBySwimlaneIdWithoutToken(boardId,swimlaneId);

            expect(getAllCardsResponse.body).to.include("Unauthorized");
            expect(getAllCardsResponse.statusCode).to.eql(401);
        });
    });
});