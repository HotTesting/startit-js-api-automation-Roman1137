export interface UserLoggedInfoResponse {
    _id: string;
    createdAt: string;
    username: string;
    emails: Array<EmailModel>;
    profile: object;
    authenticationMethod: string;
}

interface EmailModel {
    address: string;
    verified: boolean;
}