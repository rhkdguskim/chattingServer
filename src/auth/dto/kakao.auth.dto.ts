export interface KakaoLoginRequest {
    client_id : string,
    redirect_uri : string,
    response_type : string,
    scope? : string,
    prompt? : string,
    login_hint? : string,
    service_terms? : string,
    state? : string,
    nonce? : string,
}

export interface KakaoLoginResponse {
    code : string,
    error : string,
    error_description : string,
    state : string,
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
    provider : string;
    id: number;
    connected_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile_nickname_needs_agreement: boolean;
        profile_image_needs_agreement: boolean;
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
            is_default_image: boolean;
        };
        name_needs_agreement: boolean;
        name: string;
        has_email: boolean;
        email_needs_agreement: boolean;
        is_email_valid: boolean;
        is_email_verified: boolean;
        email: string;
        has_phone_number: boolean;
        phone_number_needs_agreement: boolean;
        phone_number: string;
        has_age_range: boolean;
        age_range_needs_agreement: boolean;
        age_range: string;
        has_birthyear: boolean;
        birthyear_needs_agreement: boolean;
        birthyear: string;
        has_birthday: boolean;
        birthday_needs_agreement: boolean;
        birthday: string;
        birthday_type: string;
        has_gender: boolean;
        gender_needs_agreement: boolean;
        gender: string;
    };
}

export interface KakaoLogoutRequest {
    client_id : string,
    logout_redirect_uri : string,
    state? : string,
}

export interface KakaoLogoutResponse {
    state? : string
}