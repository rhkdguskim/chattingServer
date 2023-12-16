export interface JWTRequest {
    id: number;
    user_id: string;
    refresh_token?: boolean;
}

export interface JWTResponse extends JWTRequest {
    iat: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface OAuthRequest {
    access_token: string;
    refresh_token: string;
}