import {expect} from "chai";
import {
    RegistrationService,
    User
} from "./index";

describe('Registration tests', async () => {
    let registrationService = new RegistrationService();

    describe('positive cases', async () => {

        it('should register valid user', async () => {
            let user =  User.GenerateValid();

            let response = await registrationService.registerUser(user);

            expect(response, `Received response: ${JSON.stringify(response)}`)
                .to.have.nested.property("body")
                .that.includes.all.keys(["token", "tokenExpires", "id"])
        });
    });

    describe('negative cases', async () => {

        it('should not register user with the same email twice', async () => {
            // arrange
            let user = User.GenerateValid();

            await registrationService.registerUser(user);

            let userNew = User.Create()
                .withEmail(user.email)
                .withPassword()
                .withUserName()
                .build();

            // act
            let response = await registrationService.registerIncorrectly(userNew);

            expect(response.body.error).to.eql(403);
            expect(response.body.reason, "Email already exists")
        });

        it('should not register user with the same userName twice', async () => {
            // arrange
            let user = User.GenerateValid();

            await registrationService.registerUser(user);

            let userNew = User.Create()
                .withEmail()
                .withPassword()
                .withUserName(user.username)
                .build();

            // act
            let response = await registrationService.registerIncorrectly(userNew);

            expect(response.body.error).to.eql(403);
            expect(response.body.reason, "Username already exists")
        });
    });
});