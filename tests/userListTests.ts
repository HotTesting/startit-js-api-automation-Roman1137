import {expect} from "chai";
import {
    LoginService,
    RegistrationService,
    User,
    UserListService,
    DeleteService
} from "../framework";

describe('User-lists tests', async () => {

    let registrationService = new RegistrationService(),
        loginService = new LoginService(),
        userListService = new UserListService(),
        deleteUserService = new DeleteService();

    xdescribe('positive cases', async () => {

        it('should display registered used', async () => {
            let user = User.GenerateValid();

            await registrationService.registerValid(user);

            let response = await userListService.getAllUsersInfo();

            let containsUser = response.body.list.some(us => us.username === user.username);
            expect(containsUser, `Received response: ${JSON.stringify(response)}`)
                .to.be.true;
        });

        it('should not display delete user', async () => {
            // arrange
            let user = User.GenerateValid();

            let registrationResponse = await registrationService.registerValid(user);

            await deleteUserService.deleteUser(registrationResponse.body.id);

            // act
            let getAllInfoResponse = await userListService.getAllUsersInfo();

            let containsUser = getAllInfoResponse.body.list.some(us => us.username === user.username);
            expect(containsUser, `Received response: ${JSON.stringify(getAllInfoResponse)}`)
                .to.be.false;
        });
    });

    describe('negative cases', async () => {

        it('should return error when non-admin token is used', async () => {
            let defaultUserToken = await loginService.getDefaultUserToken();
            let response = await userListService.getAllUsersInfoUsingSpecificToken(defaultUserToken);

            expect(response.body.isClientSafe).to.eql(true);
            expect(response.body.error).to.eql("Forbidden");
            expect(response.body.reason).to.eql("Forbidden");
            expect(response.body.message).to.eql("Forbidden [Forbidden]");
            expect(response.body.errorType).to.eql("Meteor.Error");
            expect(response.body.statusCode).to.eql(403);
        });

        it('should return error when no token is put to the request', async () => {
            let response = await userListService.getAllUsersInfoWithoutToken();

            expect(response.body.isClientSafe).to.eql(true);
            expect(response.body.error).to.eql("Unauthorized");
            expect(response.body.reason).to.eql("Unauthorized");
            expect(response.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(response.body.errorType).to.eql("Meteor.Error");
            expect(response.body.statusCode).to.eql(401);
        });
    });
});