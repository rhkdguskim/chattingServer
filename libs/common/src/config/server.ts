import * as config from "config";
const server = config.get("server");

export const MAIN_HOST = server.host;
export const MAIN_PORT = server.port;

export const FILE_HOST = server.filehost;
export const FILE_PORT = server.fileport;

export const AUTHENTICATION_HOST = server.authenticationhost;
export const AUTHENTICATION_PORT = server.authenticationport;

export const AUTHORIZAION_HOST = server.authorizationhost;
export const AUTHORIZAION_PORT = server.authorizationport;

export const FRIEND_HOST = server.friendhost;
export const FRIEND_PORT = server.friendport;

export const CHAT_HOST = server.chathost;
export const CHAT_PORT = server.chatport;

export const ROOM_HOST = server.roomhost;
export const ROOM_PORT = server.roomport;