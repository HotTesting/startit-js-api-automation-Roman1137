import {expect} from "chai";
import {
    Board,
    CreateBoardService,
    GetAllBoardsService,
    Permissions
} from "./index";

describe('Create board tests', async () => {
    let createBoardService = new CreateBoardService(),
        getAllBoardsService = new GetAllBoardsService();

    describe('positive cases', async () => {

        it('should create board using model with only required fields', async () => {
            let board = Board.Create()
                .WithTitle()
                .WithOwner()
                .build();

            let createBoardResponse = await createBoardService.createBoard(board);

            expect(createBoardResponse.body._id).not.to.be.null;
            expect(createBoardResponse.body.defaultSwimlaneId).not.to.be.null;
        });

        it('should create board using model with optional fields', async () => {
            let board = Board.Create()
                .WithTitle()
                .WithOwner()
                .WithColor()
                .WithPermissions()
                .build();

            let createBoardResponse = await createBoardService.createBoard(board);

            expect(createBoardResponse.body._id).not.to.be.null;
            expect(createBoardResponse.body.defaultSwimlaneId).not.to.be.null;
        });

        it(`should return title from 'all boards' list specified during board creation`, async () => {
            let board = Board.Create()
                .WithTitle()
                .WithOwner()
                .WithPermissions(Permissions.Public)
                .build();

            let createBoardResponse = await createBoardService.createBoard(board);
            let getAllBoardsResponse = await getAllBoardsService.getAllBoards();
            let createdBoard = getAllBoardsResponse.body.find(b => b._id == createBoardResponse.body._id);

            expect(createdBoard.title, JSON.stringify(getAllBoardsResponse))
                .to.eql(board.title);
        });

        it(`should show public board in 'all board' list`, async () => {
            let board = Board.Create()
                .WithTitle()
                .WithOwner()
                .WithPermissions(Permissions.Public)
                .build();

            let createBoardResponse = await createBoardService.createBoard(board);
            let getAllBoardsResponse = await getAllBoardsService.getAllBoards();
            let createdBoard = getAllBoardsResponse.body.find(b => b._id == createBoardResponse.body._id);

            expect(createdBoard, JSON.stringify(getAllBoardsResponse))
                .not.to.eql(undefined);
        });

        it(`should not show private board in 'all board' list`, async () => {
            let board = Board.Create()
                .WithTitle()
                .WithOwner()
                .WithPermissions(Permissions.Private)
                .build();

            let createBoardResponse = await createBoardService.createBoard(board);
            let getAllBoardsResponse = await getAllBoardsService.getAllBoards();
            let createdBoard = getAllBoardsResponse.body.find(b => b._id == createBoardResponse.body._id);

            expect(createdBoard, JSON.stringify(getAllBoardsResponse))
                .to.eql(undefined);
        });
    });

    describe('negative cases', async () => {

        it('should not create board without admin token', async () => {
            let board = Board.GenerateValid();

            let createBoardResponse = await createBoardService.createBoardWithoutToken(board);

            expect(createBoardResponse.body.isClientSafe).to.eql(true);
            expect(createBoardResponse.body.error).to.eql("Unauthorized");
            expect(createBoardResponse.body.reason).to.eql("Unauthorized");
            expect(createBoardResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(createBoardResponse.body.errorType).to.eql("Meteor.Error");
            expect(createBoardResponse.body.statusCode).to.eql(401);
        });
    });
});