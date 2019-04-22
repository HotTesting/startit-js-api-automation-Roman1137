import {
    DeleteUserService,
    LoginService,
    RegistrationService,
    UserListService,
    User,
    GetUserInfoService,
    expect
} from "../index";

describe('Get User Info tests', async () => {

    let registrationService = new RegistrationService(),
        loginService = new LoginService(),
        userListService = new UserListService(),
        deleteUserService = new DeleteUserService(),
        getUserInfoService = new GetUserInfoService();


    describe('positive tests', async () => {

        it('should return just created user info', async () => {
            let user = User.GenerateValid();

            let registerResponse = await registrationService.registerUser(user);

            let getInfoResponse = await getUserInfoService.getUserInfo(registerResponse.body.id);

            expect(getInfoResponse.body._id).to.eql(registerResponse.body.id);

            expect(getInfoResponse.body.emails[0].address).to.eql(user.email);
            expect(getInfoResponse.body.emails[0].verified).to.eql(false);

            expect(getInfoResponse.body.username).to.eql(user.username);

            expect(getInfoResponse.body.authenticationMethod).to.eql("password");
        });

        it('should have [isAdmin = true] in info for admin user', async () => {
            let loginResponse = await loginService.login(User.Admin);

            let getInfoResponse = await getUserInfoService.getUserInfo(loginResponse.body.id);

            expect(getInfoResponse.body.isAdmin).to.eql(true);
        });
    });

    describe('negative tests', async () => {

        it('should return error when getting info with non-admin token', async () => {
            let user = User.GenerateValid();
            let registeredResponse = await registrationService.registerUser(user);

            let loginResponse = await loginService.loginAsDefaultUser();
            let getInfoResponse = await getUserInfoService.getUserInfoUsingSpecificToken(registeredResponse.body.id, loginResponse.token);

            expect(getInfoResponse.body.isClientSafe).to.eql(true);
            expect(getInfoResponse.body.error).to.eql("Forbidden");
            expect(getInfoResponse.body.reason).to.eql("Forbidden");
            expect(getInfoResponse.body.message).to.eql("Forbidden [Forbidden]");
            expect(getInfoResponse.body.errorType).to.eql("Meteor.Error");
            expect(getInfoResponse.body.statusCode).to.eql(403);
        });

        it('should return error when getting info without token', async () => {
            let user = User.GenerateValid();

            let registerResponse = await registrationService.registerUser(user);

            let getInfoResponse = await getUserInfoService.getUserInfoWithoutToken(registerResponse.body.id);

            expect(getInfoResponse.body.isClientSafe).to.eql(true);
            expect(getInfoResponse.body.error).to.eql("Unauthorized");
            expect(getInfoResponse.body.reason).to.eql("Unauthorized");
            expect(getInfoResponse.body.message).to.eql("Unauthorized [Unauthorized]");
            expect(getInfoResponse.body.errorType).to.eql("Meteor.Error");
            expect(getInfoResponse.body.statusCode).to.eql(401);
        });
    });
});