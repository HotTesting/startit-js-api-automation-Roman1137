import {
    Board,
    CreateBoardService,
    CreateSwimlaneService,
    GetAllSwimlanesService,
    Swimlane,
    TypifiedResponse,
    SwimLaneCreationResponseModel,
    SwimlaneModel,
    expect
} from "./index";

describe('Create board tests', async () => {
    let createBoardService = new CreateBoardService(),
        createSwimlaneService = new CreateSwimlaneService(),
        getAllSwimlanesService = new GetAllSwimlanesService();

    describe('positive cases', async () => {
        let swimlane: SwimlaneModel,
            boardId: string,
            createSwimlaneResponse:TypifiedResponse<SwimLaneCreationResponseModel>;

        before(async () => {
            let board = Board.GenerateValid();
            let createBoardResponse = await createBoardService.createBoard(board);

            swimlane = Swimlane.GenerateValid();
            boardId = createBoardResponse.body._id;
            createSwimlaneResponse = await createSwimlaneService.createSwimlaneByBoardId(swimlane, boardId);
        });

        it('should create swimlane', async () => {
            expect(createSwimlaneResponse.body._id, JSON.stringify(createSwimlaneResponse))
                .not.to.eql(null);
        });

        it('should display just created swimlane in [all swimlane by board] list', async () => {
            let getAllSwimlanesResponse = await getAllSwimlanesService.getAllSwimlanesByBoardId(boardId);

            let swimlaneFromResponse = getAllSwimlanesResponse.body.find(sw => sw.title === swimlane.title);

            expect(swimlaneFromResponse, JSON.stringify(getAllSwimlanesResponse))
                .not.to.eql(undefined);
        });

        describe('Creating another one swinlane with the same title', async () => {

            before(async () => {
                createSwimlaneResponse = await createSwimlaneService.createSwimlaneByBoardId(swimlane, boardId);
            });

            it('should create swimlane even with already used title ', async () => {
                expect(createSwimlaneResponse.body._id, JSON.stringify(createSwimlaneResponse))
                    .not.to.eql(null);
            });

            it('should display 2 swimlanes in [all swimlane by board] lisr', async () => {
                let getAllSwimlanesResponse = await getAllSwimlanesService.getAllSwimlanesByBoardId(boardId);

                let swimlaneFromResponse = getAllSwimlanesResponse.body.filter(sw => sw.title === swimlane.title);

                expect(swimlaneFromResponse.length, JSON.stringify(getAllSwimlanesResponse))
                    .to.eql(2);
            });
        });

    });

    describe('negative cases', async () => {

        it('should not create board without admin token', async () => {
            let board = Board.GenerateValid();
            let createBoardResponse = await createBoardService.createBoard(board);

            let swimlane = Swimlane.GenerateValid();
            let boardId = createBoardResponse.body._id;
            let createSwimlaneResponse = await createSwimlaneService.createSwimlaneByBoardIdWithoutToken(swimlane, boardId);

            expect(createSwimlaneResponse.body.isClientSafe).to.eql(true);
            expect(createSwimlaneResponse.body.error).to.eql("Unauthorized");
            expect(createSwimlaneResponse.body.reason).to.eql("Unauthorized");
            expect(createSwimlaneResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(createSwimlaneResponse.body.errorType).to.eql("Meteor.Error");
            expect(createSwimlaneResponse.body.statusCode).to.eql(401);
        });
    });
});