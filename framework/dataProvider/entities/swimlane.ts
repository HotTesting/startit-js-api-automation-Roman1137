import {SwimlaneModel} from "../../models/request";
import {RandomDataGenerator} from "../randomDataGenerator";
import {ConsoleLogger} from "../../../loggers";

export class Swimlane {

    private swimlane: SwimlaneModel = {};

    public static Create(): Swimlane {
        return new Swimlane();
    }

    public static GenerateValid(): SwimlaneModel {
        return Swimlane.Create()
            .WithTitle()
            .build();
    }

    public WithTitle(title?: string): Swimlane  {
        this.swimlane.title = title || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public build(): SwimlaneModel {
        ConsoleLogger.info(`Swimlane is generated: ${JSON.stringify(this.swimlane)}`);
        return this.swimlane;
    }
}