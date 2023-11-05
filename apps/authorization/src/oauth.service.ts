import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as querystring from 'querystring';


interface OAuthRequest {
    grant_type: string,
    client_id : string,
    redirect_uri : string,
    code : string,
    client_secret? : string,
}

@Injectable()
export class OauthService {
   
    constructor(private httpService : HttpService) {}

    kakaoVertify(payload : OAuthRequest) {
        const body = querystring.stringify({
            grant_type: payload.grant_type,
            client_id: payload.client_id,
            redirect_uri: payload.redirect_uri,
            code: payload.code,
            client_secret: payload.client_secret,
          });

        const response = this.httpService.post('https://kauth.kakao.com/oauth/token', body, {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return response
    }
}