import * as config from "config";
const server = config.get("server");

export const MAIN_HOST = server.host;
export const MAIN_PORT = server.port;

export const AUTHENTICATION_HOST = server.authenticationhost;
export const AUTHENTICATION_PORT = server.authenticationport;

export const AUTHORIZAION_HOST = server.authorizationhost;
export const AUTHORIZAION_PORT = server.authorizationport;