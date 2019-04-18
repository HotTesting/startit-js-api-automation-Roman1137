import {UserModel} from "../../models";
import {ConsoleLogger} from "../../../loggers";
import {RandomDataGenerator} from "../randomDataGenerator";

export class User {

    private user : UserModel = {};

    public static get Admin(): UserModel {
        return {
            username: process.env.ADMIN_USER_NAME,
            email: process.env.ADMIN_USER_EMAIL,
            password: process.env.ADMIN_USER_PASSWORD
        }
    }

    public static get Default(): UserModel {
        return {
            username: process.env.DEFAULT_USER_NAME,
            email: process.env.DEFAULT_USER_EMAIL,
            password: process.env.DEFAULT_USER_PASSWORD
        }
    }

    public static GenerateValid(): UserModel {
        return User.Create()
            .withEmail()
            .withUserName()
            .withPassword()
            .build();
    }

    public static Create(): User {
        return new User;
    }

    public withUserName(userName? : string): User {
        this.user.username = userName || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public withEmail(email? : string): User {
        this.user.email = email || RandomDataGenerator.getRandomEmail(10);
        return this;
    }

    public withPassword(password? : string): User {
        this.user.password = password || RandomDataGenerator.getRandomName(10);
        return this;
    }

    public build(): UserModel {
        ConsoleLogger.info(`User is generated: ${JSON.stringify(this.user)}`);
        return this.user;
    }
}
