import {UserModel} from "../models/request/userModel";
import * as faker from "faker";

export class User {

    private user : UserModel = {};

    public static get Admin(): UserModel {
        return {
            username: "Unknown",
            email: "wekan_superadmin@ip-5236.sunline.net.ua",
            password: "wekan_superadmin@ip-5236.sunline.net.ua"
        }
    }

    public static get Default(): UserModel {
        return {
            username: "Unknown",
            email: "first_user@gmail.com",
            password: "12345"
        }
    }

    public static CreateValid(): UserModel {
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
        this.user.username = userName || faker.name.firstName();
        return this;
    }

    public withEmail(email? : string): User {
        this.user.email = email || faker.internet.email();
        return this;
    }

    public withPassword(password? : string): User {
        this.user.password = password || faker.internet.password();
        return this;
    }

    public build(): UserModel {
        return this.user;
    }
}
