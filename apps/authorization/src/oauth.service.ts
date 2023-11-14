import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as querystring from 'querystring';
export interface IOauthService {
    getToken();
    getUserInfo();
}

@Injectable()
export class OauthService implements IOauthService {
    constructor(private httpService : HttpService) {}

    getToken() {

    }

    getUserInfo() {

    }
}