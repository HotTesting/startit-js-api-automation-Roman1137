import {BoardModel, CardModel} from "../../models";
import {RandomDataGenerator} from "../randomDataGenerator";
import {ConsoleLogger} from "../../../loggers";

export class Card {

    private card: CardModel = {};

    public static Create(): Card {
        return new Card();
    }

    public WithTitle(title?: string): Card  {
        this.card.title = title || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public WithDescription(description?: string): Card  {
        this.card.description = description || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public WithAuthorId(authorId: string): Card  {
        this.card.authorId = authorId;
        return this;
    }

    public WithSwimlaneId(swimlaneId: string): Card  {
        this.card.swimlaneId = swimlaneId;
        return this;
    }

    public build(): CardModel {
        ConsoleLogger.info(`Card is generated: ${JSON.stringify(this.card)}`);
        return this.card;
    }
}