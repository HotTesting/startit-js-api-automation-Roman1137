export interface UsersListResponse {
    list: Array<UserInfo>;
}

interface UserInfo {
    _id: string;
    username: string;
}