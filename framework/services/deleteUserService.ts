import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    DeletedUserResponse
} from ".."

export class DeleteUserService {

    public async deleteUser(userId): Promise<TypifiedResponse<DeletedUserResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let token = await new LoginService().getAdminToken();

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(token)
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