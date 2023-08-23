export class KakaoLoginRequest {
    client_id! : string;
    redirect_uri! : string;
    response_type! : string;
    scope? : string;
    prompt? : string;
    login_hint? : string;
    service_terms? : string;
    state? : string;
    nonce? : string;
}

export class KakaoLoginResponse {
    code : string;
    error : string;
    error_description : string;
    state : string;
}

export interface KakaoAuthRequest {
    grant_type : string,
    client_id : string,
    redirect_uri : string,
    code : string,
    client_secret : string,
}

export interface KakaoAuthResponse {
    token_type : string,
    access_token : string,
    id_token : string,
    expires_in : number,
    refresh_token : string,
    refresh_token_expires_in : number,
    scope : string,    
}

export interface KakaoUserResponse {
    user : number,
}