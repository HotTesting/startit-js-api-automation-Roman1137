import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    DeletedUserResponse
} from "../../index"

export class DeleteUserService {

    public async deleteUser(userId: string): Promise<TypifiedResponse<DeletedUserResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(loginResponse.token)
            .send();
    }

    public async deleteUserUsingSpecificToken(userId: string, token: string,): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(token)
            .send();
    }

    public async deleteUserWithoutToken(userId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .send();
    }
}