import {expect} from "chai";
import {
    Board,
    CreateBoardService,
    CreateSwimlaneService,
    LoginService,
    Swimlane,
    Card,
    CreateCardService, TypifiedResponse, CardCreationResultResponse, CardModel, RetrieveCardService
} from "./index";

describe('Create card tests', async () => {
    let createBoardService = new CreateBoardService(),
        createCardService = new CreateCardService(),
        createSwimlaneService = new CreateSwimlaneService(),
        loginService = new LoginService(),
        retrieveCardsService = new RetrieveCardService();

    describe('positive cases', async () => {
        let swimlaneId: string,
            boardId: string,
            card: CardModel;

        it('should create valid card', async () => {
            let board = Board.GenerateValid();
            let createBoardResponse = await createBoardService.createBoard(board);

            let swimlane = Swimlane.GenerateValid();
            boardId = createBoardResponse.body._id;
            swimlaneId = (await createSwimlaneService.createSwimlaneByBoardId(swimlane, boardId)).body._id;

            let adminId = (await loginService.loginAsAdmin()).id;
            card = Card.Create()
                .WithTitle()
                .WithDescription()
                .WithAuthorId(adminId)
                .WithSwimlaneId(swimlaneId)
                .build();

            let createCardResponse = await createCardService.createCardByBoardId(card, boardId);

            expect(createCardResponse.body._id).not.to.eql(null);
        });

        describe('creation card with the same data', async () => {
            let createCardResponse: TypifiedResponse<CardCreationResultResponse>;

            before(async () => {
                createCardResponse = await createCardService.createCardByBoardId(card, boardId);
            });

            it('should create card with the same data', async () => {
                expect(createCardResponse.body._id, JSON.stringify(createCardResponse))
                    .not.to.eql(null);
            });

            it('should display 2 just created cards in [all cards list]', async () => {
                let getAllCardsResponse = await retrieveCardsService.retrieveAllCardsFromBoardBySwimlaneId(boardId,swimlaneId);

                let justCreatedCards = getAllCardsResponse.body.filter(cr => cr.title === card.title);
                expect(justCreatedCards.length, JSON.stringify(justCreatedCards))
                    .to.eql(2);
            });
        });
    });

    describe('negative cases', async () => {

        it('should not create valid card without admin token', async () => {
            let boardId = "someBoardId";
            let swimlaneId = "someSwimlaneId";

            let adminId = (await loginService.loginAsAdmin()).id;
            let card = Card.Create()
                .WithTitle()
                .WithDescription()
                .WithAuthorId(adminId)
                .WithSwimlaneId(swimlaneId)
                .build();

            let createCardResponse = await createCardService.createCardByBoardIdWithoutToken(card, boardId);

            expect(createCardResponse.body).to.include("Unauthorized");
            expect(createCardResponse.statusCode).to.eql(401);
        });
    });
});