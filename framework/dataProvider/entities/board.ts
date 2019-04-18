import {BoardModel} from "../../models";
import {RandomDataGenerator} from "../randomDataGenerator";
import {Permissions} from "../enums/permissions";
import {Color} from "../enums/color";
import {ConsoleLogger} from "../../../loggers";

export class Board {

    private board: BoardModel = {};

    public static GenerateValid(): BoardModel {
        return Board.Create()
            .WithTitle()
            .WithOwner()
            .WithPermissions()
            .WithColor()
            .build();
    }

    public static Create(): Board {
        return new Board();
    }

    public WithTitle(title?: string): Board  {
        this.board.title = title || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public WithOwner(owner?: string): Board  {
        this.board.owner = owner || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public WithPermissions(permission?: Permissions): Board  {
        this.board.permission = permission || Permissions.Default;
        return this;
    }

    public WithColor(color?: Color): Board  {
        this.board.color = color || Color.Default;
        return this;
    }

    public build(): BoardModel {
        ConsoleLogger.info(`Board is generated: ${JSON.stringify(this.board)}`);
        return this.board;
    }
}