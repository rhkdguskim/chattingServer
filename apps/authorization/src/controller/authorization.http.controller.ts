import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {GetOAuthData} from "@app/common/decoration/auth.decorator";
import {OAuthData} from "@app/authorization/dto/oauth.dto";
import {AuthorizationController} from "./authorization.controller.interface";
import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";
import {AUTHORIZATION_SERVICE} from "../authorization.metadata";
import {AuthorizationService} from "../providers/authorization.service.interface";

@Controller("auth")
@ApiTags("Authorization")
export class AuthorizationHttpController implements AuthorizationController{
    constructor(@Inject(AUTHORIZATION_SERVICE)private authorizationService: AuthorizationService) {}

    @Post("google")
    @UseGuards(AuthGuard("google"))
    @ApiOperation({
        summary: "OAuth 2.0 구글 로그인 API",
        description: "구글으로 인증하여 로그인을 구현입니다.",
    })
    oAuthGoogle(@GetOAuthData()data: OAuthData): Promise<TokenResponse> {
        return Promise.resolve(undefined);
    }

    @Post("kakao")
    @UseGuards(AuthGuard("kakao"))
    @ApiOperation({
        summary: "OAuth 2.0 카카오톡 로그인 API",
        description: "카카오톡으로 인증하여 로그인을 구현합니다.",
    })
    oAuthKakao(@GetOAuthData()data: OAuthData): Promise<TokenResponse> {
        return Promise.resolve(undefined);
    }

    @Post("naver")
    @UseGuards(AuthGuard("naver"))
    @ApiOperation({
        summary: "OAuth 2.0 네이버 로그인 API",
        description: "네이버으로 인증하여 로그인을 구현합니다.",
    })
    oAuthNaver(@GetOAuthData()data: OAuthData): Promise<TokenResponse> {
        return Promise.resolve(undefined);
    }

    @Post("refreshtoken")
    @ApiOperation({
        summary: "사용자 Token 재발급 API",
        description: "Refresh Token을 사용한 access token, refresh token 재발급",
    })
    refreshToken(@Body() token: string): Promise<TokenResponse> {
        return Promise.resolve(undefined);
    }

    @Post("token")
    @ApiOperation({
        summary: "사용자 Token 발급 API",
        description: " access token, refresh token 발급",
    })
    sign(payload: JWTRequest): Promise<TokenResponse> {
        return Promise.resolve(undefined);
    }

    @Post("verify")
    @ApiOperation({
        summary: "사용자 Token 재발급 API",
        description: "Refresh Token을 사용한 access token, refresh token 재발급",
    })
    verify(payload: string): Promise<JWTResponse> {
        return Promise.resolve(undefined);
    }
}