export interface UserInfoResponse {
    _id: string;
    createdAt: string;
    services: ServicesModel;
    username: string;
    emails: Array<EmailModel>;
    isAdmin: boolean;
    profile: object;
    authenticationMethod: string
}

interface ServicesModel {
    password: PasswordModel;
    email: EmailInfoModel;
    resume: ResumeModel;
}

interface PasswordModel {
    bcrypt: string;
}

interface EmailInfoModel {
    verificationTokens: Array<VerificationTokenModel>;
}

interface VerificationTokenModel {
    token: string;
    address: string;
    when: string;
}

interface ResumeModel {
    loginTokens: Array<LoginTokenModel>;
}

interface LoginTokenModel {
    when: string;
    hashedToken: string;
}

interface EmailModel {
    address: string;
    verified: boolean;
}

