export interface ApiResponse {
    token: string;
    message: any;
    response_id: string;
}

export interface LoginResponse extends ApiResponse {
    user: string;
    id: string;
    email: string;
    createdAd: string;
}