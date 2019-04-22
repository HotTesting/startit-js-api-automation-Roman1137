export enum SchemaJson {
    CreateBoard = "boardRelated/createBoard",
    GetAllBoards = "boardRelated/getAllBoards",

    CreateCard = "cardRelated/createCard",
    GetCardById = "cardRelated/getCardById",

    PermissionsError = "errorRelated/permissionsError",
    Error = "errorRelated/error",

    CreateSwimlane = "swimlaneRelated/createSwimlane",
    GetSwimlanes = "swimlaneRelated/getSwimlanes",

    GetUserInfo = "userRelated/getUserInfo",
    GetLoggedUserInfo = "userRelated/getLoggedUserInfo",
    DeleteUser = "userRelated/deleteUser",
    GetAuth = "userRelated/getAuth",
    GetUserList = "userRelated/userList"
}