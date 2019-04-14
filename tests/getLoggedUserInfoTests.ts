import {expect} from "chai";
import {
    DeleteService,
    LoginService,
    RegistrationService,
    UserListService,
    User, GetUserInfoService,
    GetLoggedUserInfoService
} from "./index";

describe('Get logged user info tests', async () => {

    let registrationService = new RegistrationService(),
        loginService = new LoginService(),
        userListService = new UserListService(),
        deleteUserService = new DeleteService(),
        getUserInfoService = new GetUserInfoService(),
        getLoggedUserInfoService = new GetLoggedUserInfoService();

    describe('positive cases', async () => {

        it('should return just created user info', async () => {
            let user = User.GenerateValid();
            let registerResponse = await registrationService.registerUser(user);

            let getLoggedInfoResponse = await getLoggedUserInfoService.getUserInfoByToken(registerResponse.body.token);

            expect(getLoggedInfoResponse.body._id).to.eql(registerResponse.body.id);

            expect(getLoggedInfoResponse.body.emails[0].address).to.eql(user.email);
            expect(getLoggedInfoResponse.body.emails[0].verified).to.eql(false);

            expect(getLoggedInfoResponse.body.username).to.eql(user.username);

            expect(getLoggedInfoResponse.body.authenticationMethod).to.eql("password");
        });
    });

    describe('negative cases', async () => {

        it('should return error while getting info without token', async () => {
            let getLoggedInfoResponse = await getLoggedUserInfoService.getUserInfoWithoutToken();

            expect(getLoggedInfoResponse.body.isClientSafe).to.eql(true);
            expect(getLoggedInfoResponse.body.error).to.eql("Unauthorized");
            expect(getLoggedInfoResponse.body.reason).to.eql("Unauthorized");
            expect(getLoggedInfoResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(getLoggedInfoResponse.body.errorType).to.eql("Meteor.Error");
            expect(getLoggedInfoResponse.body.statusCode).to.eql(401);
        });

        it('should not return deleted user info', async () => {
            let user = User.GenerateValid();
            let registerResponse = await registrationService.registerUser(user);

            await deleteUserService.deleteUser(registerResponse.body.id);

            let token = registerResponse.body.token;
            let getLoggedInfoResponse = await getLoggedUserInfoService.getUserInfoByTokenIncorrectly(token);

            expect(getLoggedInfoResponse.body.isClientSafe).to.eql(true);
            expect(getLoggedInfoResponse.body.error).to.eql("Unauthorized");
            expect(getLoggedInfoResponse.body.reason).to.eql("Unauthorized");
            expect(getLoggedInfoResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(getLoggedInfoResponse.body.errorType).to.eql("Meteor.Error");
            expect(getLoggedInfoResponse.body.statusCode).to.eql(401);
        });
    });
});