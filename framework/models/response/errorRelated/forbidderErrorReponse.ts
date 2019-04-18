export interface ForbidderErrorReponse {
    isClientSafe: boolean;
    error: string;
    reason: string;
    message: string;
    errorType: string;
    statusCode: number;
}