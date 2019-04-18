import {expect} from "chai";
import {
    DeleteUserService,
    LoginService,
    RegistrationService,
    User
} from "./index";

describe('Delete user tests', async () => {

    let registrationService = new RegistrationService(),
        loginService = new LoginService(),
        deleteUserService = new DeleteUserService();

    describe('positive cases', async () => {

        it('should delete just registered user', async () => {
            // arrange
            let user = User.GenerateValid();

            let registrationResponse = await registrationService.registerUser(user);

            // act
            let deleteUserResponse = await deleteUserService.deleteUser(registrationResponse.body.id);

            // assert
            expect(deleteUserResponse.body._id, `Received response: ${JSON.stringify(deleteUserResponse)}`)
                .to.eql(registrationResponse.body.id);
        });
    });

    describe('negative cases', async () => {

        it('should return error while deleting with non-admin token', async () => {
            // arrange
            let user = User.GenerateValid();

            let registrationResponse = await registrationService.registerUser(user);

            // act
            let defaultUserToken = await loginService.getDefaultUserToken();
            let deleteUserResponse = await deleteUserService
                .deleteUserUsingSpecificToken(registrationResponse.body.id, defaultUserToken);

            // assert
            expect(deleteUserResponse.body.isClientSafe).to.eql(true);
            expect(deleteUserResponse.body.error).to.eql("Forbidden");
            expect(deleteUserResponse.body.reason).to.eql("Forbidden");
            expect(deleteUserResponse.body.message).to.eql("Forbidden [Forbidden]");
            expect(deleteUserResponse.body.errorType).to.eql("Meteor.Error");
            expect(deleteUserResponse.body.statusCode).to.eql(403);
        });

        it('should return error while deleting without token', async () => {
            // arrange
            let user = User.GenerateValid();

            let registrationResponse = await registrationService.registerUser(user);

            // act
            let deleteUserResponse = await deleteUserService.deleteUserWithoutToken(registrationResponse.body.id);

            // assert
            expect(deleteUserResponse.body.isClientSafe).to.eql(true);
            expect(deleteUserResponse.body.error).to.eql("Unauthorized");
            expect(deleteUserResponse.body.reason).to.eql("Unauthorized");
            expect(deleteUserResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(deleteUserResponse.body.errorType).to.eql("Meteor.Error");
            expect(deleteUserResponse.body.statusCode).to.eql(401);
        });
    });
});